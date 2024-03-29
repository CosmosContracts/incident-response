# Juno July 28, 2022 Chain Halt Upgrade

This upgrade is effectively a hard fork with the same chain-id. This means we'll need to delete all previous data and start from a new genesis.

NOTE: This assumes you've already ran through setting up a juno node here: https://docs.junonetwork.io/validators/getting-setup

## Performing the  Upgrade

### 1. Stop the node
```sh
sudo systemctl stop junod
```

### 2. Backup priv_validator_key.json
This is only relevant if you're upgrading your validator. Your priv_validator_key.json is how your validator is identified. If you haven't backed it up already, **DO SO NOW**.

An example method for doing so is as follows, which will copy your validator key to the home dir:
```sh
cd ~
cp ~/.juno/config/priv_validator_key.json .
```

*NOTE*: keeping your copy of the validator key on the same machine is NOT sufficient. At a bare minimum it should be backed up locally so you always have access to it.

### 3. Backup priv_validator_state.json
It's worth backing up your `priv_validator_state.json` in case this upgrade fails and an alternative path must be taken. 
```sh
cd ~
cp ~/.juno/data/priv_validator_state.json .
```

### 4. Purge previous chain state and addrbook.json
Because we'll be starting from a new genesis, the previous data is no longer necessary.
```sh
junod tendermint unsafe-reset-all --home $HOME/.juno
```

### 5. Purge current peers and seeds from config.toml
This is done to ensure all peers are clean when moving forward. The addrbook.json file was already purged in the previous step.

**WARNING:** DO NOT DO BLANK PERSISTENT PEERS IF YOU ARE RUNNING SENTRIES. Only remove persistent peers that are not your sentries/val node.

```sh
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"\"/" ~/.juno/config/config.toml
sed -i.bak -e "s/^seeds *=.*/seeds = \"\"/" ~/.juno/config/config.toml
```

### 6. Add seeds and peers to config.toml
These are all verified to be using the new genesis file and binary.

**WARNING:** These should be added manually if you are running a sentries setup, or you will blank out your peers.
```sh
SEEDS="47ba9e0e413e14a778b0c2139d7e49cf3d3c9c07@141.94.195.104:26656"
PEERS="ba89aa161ae33ddffa508d57368bd2666a97bbe2@164.68.115.226:26656,3f9f2b2b857c13c89d6d7a88d5ee90fc0a8d3736@144.91.64.59:26656,fa39785c5c0cda07a0b0b61a686401da78909034@5.9.19.119:26656,0eeb0232a4883c4a57a52af006fc2ad5b64b59b3@49.12.176.139:26656,21d8a9da7d963db00814447979ffa2ef0f65fee9@54.216.124.105:26656,14ccff2e3eb02f0d78d16fd147a24e569edbaa43@18.206.130.37:26656,2ed6df7c98ca4ef9c40fcdce255daf56e3e502d5@51.81.208.3:26656"
sed -i.bak -e "s/^seeds *=.*/seeds = \"$SEEDS\"/" ~/.juno/config/config.toml
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.juno/config/config.toml
```

### 7. Download and install the new binary

#### 7a. Install junod v9.0.0
This new binary includes the non deterministic patch security upgrade
```sh
git clone https://github.com/CosmosContracts/juno
cd juno
git fetch
git checkout v9.0.0
make build && make install
```

To confirm the correct binary is installed, do:
```sh
junod version --long
```

```sh
name: juno
server_name: junod
version: v9.0.0
commit: e6f9629538a88edf11aa7e7ed3d68c61f8e96aa6
build_tags: netgo,ledger
go: go version go1.18.3 linux/amd64
```

#### 7c. [OPTIONAL] If you use cosmovisor
You will need to re-setup cosmovisor with the new genesis.
```sh
rm $DAEMON_HOME/cosmovisor/genesis/bin/junod
rm -rf $DAEMON_HOME/cosmovisor/upgrades
mkdir $DAEMON_HOME/cosmovisor/upgrades
cp $HOME/go/bin/junod $DAEMON_HOME/cosmovisor/genesis/bin
rm $DAEMON_HOME/cosmovisor/current
```

Check junod has copied to the new location.
```sh
$DAEMON_HOME/cosmovisor/genesis/bin/junod version

# returns
v9.0.0

tree $DAEMON_HOME/cosmovisor

# returns
$HOME.juno/cosmovisor
├── genesis
│   └── bin
│       └── junod
└── upgrades
```

### 8. Download the phoenix genesis

To build yourself or check options, [read more here](./genesis.md).

```sh
rm ~/.juno/config/genesis.json
wget https://download.dimi.sh/juno-phoenix2-genesis.tar.gz
tar -xvf juno-phoenix2-genesis.tar.gz
mv juno-phoenix2-genesis.json $HOME/.juno/config/genesis.json

# check chain is juno-1, genesis time is correct & initial block is 4136532
# note if using zsh that you may need to break this up, and run steps individually
# i.e. cat $HOME/juno/config/genesis.json | jq '.chain_id'
cat $HOME/.juno/config/genesis.json | jq '"Genesis Time: " + .genesis_time + " — Chain ID: " + .chain_id + " - Initial Height: " + .initial_height'
```

### 9. Verify genesis shasum

```sh
jq -S -c -M '' ~/.juno/config/genesis.json | sha256sum

# this will return
# 0111ef45823cab4acd3f04afbc9a58a9bd1fe7eff278918abbadc310d7911f3b  -
```

### 10. Be paranoid
This isn't strictly necessary - you can skip it. However, you might want to be paranoid and just double-check.
```sh
junod tendermint unsafe-reset-all --home $HOME/.juno
```

### 11. Restore priv_validator_key.json and priv_validator_state.json

**Important** By resetting the state we also resetted the validator sign state, which may cause double sign. We need to restore our backup to prevent this. 

If you are using a remote signer this step is probably not needed

```sh
cp ~/priv_validator_state.json ~/.juno/data/priv_validator_state.json
cp ~/priv_validator_key.json ~/.juno/config/priv_validator_key.json
```

### 12. Start the node
```sh
sudo systemctl restart junod
```

### 13. Confirm the process running
```sh
sudo journalctl -fu junod
```

**The node will take roughly 30 minutes to start**, with 64GB of RAM. After it's finished starting, the output should be as follows:
```
4:58AM INF Genesis time is in the future. Sleeping until then... genTime=2022-07-28T21:00:00Z
```

---

## FAQ

### What about ibc transactions?
They will time out and be returned to your wallets. 

### Do I need to resync?
Nope! We are effectively starting from "block 0" of the new genesis. Similarly, all snapshots no longer matter (except archive snapshots, for data integrity purposes). This is the perfect time to create a backup node or sentries if you didn't have them previously.

### What about staking rewards and/or commission?
These will be auto-claimed for you. Therefore, they are safe!

### How was the new genesis created?
The current state of juno-1 was exported from block `4136530`, one block before to the problematic one, then converted into a genesis file. Essentially that means all previously state was backed up as-is. Instructions for creating the genesis can be found here: https://github.com/CosmosContracts/incident-response/blob/main/28-July-22/genesis.md
