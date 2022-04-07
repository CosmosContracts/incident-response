This upgrade is effectively a hard fork with the same chain-id. What this means, is we'll need to delete all previous data and start from a new genesis.

NOTE: This assumes you've already ran through setting up a juno node here: https://docs.junonetwork.io/validators/getting-setup

### Upgrade

1. Stop the node
```
sudo systemctl stop junod
```

2. Backup ~/.juno/config/priv_validator_key.json
This is only relevant if you're upgrading your validator. Your priv_validator_key.json is how your validator is identified. If you haven't backed it up already, *DO SO NOW*.

An example method for doing so is as follows, which will copy it to the home dir:
```sh
cd ~
cp ~/.juno/config/priv_validato_state.json .
```

3. Delete previous chain state
Because we'll be starting from a new genesis, the previous data is no longer necessary. Similarly, the priv_validator_state.json is not necessary because there is no previous block to sign from.

```sh
junod unsafe-reset-all
```

4. Download and install the new binary
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

5. Download the new genesis
```sh:
curl TEMP_NEED_URL_PATH > ~/.juno/config/genesis.json
```

6. Start the node
```
sudo systemctl restart junod
```

7. Confirm it's running
```
sudo journalctl -fu junod
```

The output should be as follows:
```
4:58AM INF Genesis time is in the future. Sleeping until then... genTime=2022-04-07T21:00:00Z
```

### FAQ
#### What about the gov prop upgrade?
The gov upgrade is being wrapped up into v3.0.0, so **the chain will no longer halt** at `2582000`  per Lupercalia Upgrade: https://www.mintscan.io/juno/proposals/17

#### What about ibc transactions?
They will time out and be returned to your wallets. 

#### Do I need to resync?
Nope! We are effectively starting from "block 0" of the new genesis. Similarly, all snapshots no longer matter (except archive snapshots, for data integrity purposes). This is the perfect time to create a backup node or sentries if you didn't have them previously.

#### What about staking rewards?
These will be auto-claimed for you. Therefore, they are safe!
