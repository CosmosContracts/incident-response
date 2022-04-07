# Juno April 5, 2022 Chain Halt Upgrade
This upgrade is effectively a hard fork with the same chain-id. This means we'll need to delete all previous data and start from a new genesis.

NOTE: This assumes you've already ran through setting up a juno node here: https://docs.junonetwork.io/validators/getting-setup

## Performing the  Upgrade

### 1. Stop the node
```
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
In case this upgrade fails, it's worth backing up your `priv_validator_state.json` in case an alternative path must be taken. 
```sh
cd ~
cp ~/.juno/data/priv_validator_state.json .
```

### 4. Delete previous chain state
Because we'll be starting from a new genesis, the previous data is no longer necessary. Similarly, the priv_validator_state.json is not necessary because there is no previous block to sign from.

```sh
junod unsafe-reset-all
```

### 5. Purge current peers and addrbook
This is done to ensure all peers are clean when moving forward.
```
rm ~/.juno/config/addrbook.json
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"\"/" ~/.juno/config/config.toml
sed -i.bak -e "s/^seeds *=.*/seeds = \"\"/" ~/.juno/config/config.toml
```

### 6. Add seeds and peers
These are all verified to be using the new genesis file.
```
SEEDS=
PEERS=
sed -i.bak -e "s/^seeds *=.*/seeds = \"$SEEDS\"/" ~/.juno/config/config.toml
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.juno/config/config.toml
```

### 7. Download and install the new binary
This new binary includes the Lupercalia security upgrade.
```
git clone https://github.com/CosmosContracts/juno
cd juno
git fetch
git checkout v3.0.0
make install
```

To confirm the verison, do:
```
junod version --long
```

(TEMP - NEEDS TO BE REPLACED)

```
name: juno
server_name: junod
version: v2.1.0
commit: e6b8c212b178cf575035065b78309aed547b1335
build_tags: netgo muslc,
go: go version go1.17.3 linux/amd64
```

### 8. Download the new genesis
This genesis is a state-export of the previous juno chain, saving all previous transactions.
```sh:
curl TEMP_NEED_URL_PATH > ~/.juno/config/genesis.json
```

### 9. Verify genesis shasum
(TEMP, ALSO NOT CORRECT!)
```sh:
jq -S -c -M '' ~/.juno/config/genesis.json | sha256sum
[shasum to be added]  -
```

### 10. Start the node
```
sudo systemctl restart junod
```

### 11. Confirm the process running
```
sudo journalctl -fu junod
```

The output should be as follows:
```
4:58AM INF Genesis time is in the future. Sleeping until then... genTime=2022-04-07T21:00:00Z
```

---

## FAQ
### What about the gov prop upgrade?
The gov upgrade is being wrapped up into v3.0.0, so **the chain will no longer halt** at `2582000`  per Lupercalia Upgrade: https://www.mintscan.io/juno/proposals/17

### What about ibc transactions?
They will time out and be returned to your wallets. 

### Do I need to resync?
Nope! We are effectively starting from "block 0" of the new genesis. Similarly, all snapshots no longer matter (except archive snapshots, for data integrity purposes). This is the perfect time to create a backup node or sentries if you didn't have them previously.

### What about staking rewards and/or commission?
These will be auto-claimed for you. Therefore, they are safe!

### How was the new genesis created?
The current state of juno-1 was exported from block ***96, one block before to the problematic one, then converted into a genesis file. Essentially that means all previously state was backed up as-is. Instructions for creating the genesis can be found here: https://github.com/CosmosContracts/incident-response/blob/main/5-April-22/genesis.md