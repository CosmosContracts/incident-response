## Genesis

It's time for the phoenix genesis.

Download it via the links below, and _ensure the hash matches_.

### Download

```sh
wget https://download.dimi.sh/juno-phoenix2-genesis.tar.gz
tar -xvf juno-phoenix2-genesis.tar.gz
mv juno-phoenix2-genesis.json $HOME/.juno/config/genesis.json

# check chain is juno-1, genesis time is correct & initial block is 4136532
# note if using zsh that you may need to break this up, and run steps individually
# i.e. cat $HOME/juno/config/genesis.json | jq '.chain_id'
cat $HOME/.juno/config/genesis.json | jq '"Genesis Time: " + .genesis_time + " — Chain ID: " + .chain_id + " - Initial Height: " + .initial_height'
```

## Verification

If you want to make sure that the genesis has not been corrupted (which is the role of any good validator here is the procedure to follow)

```sh
cosmovisor export --height=4136530 2> juno-4136532.json
cat juno-4136532.json | jq -r '.chain_id = "juno-1" | .genesis_time = "2022-07-28T21:00:00Z" | .initial_height = "4136532"' > genesis.json
```

Then you just have to make a diff between genesis.json and your original genesis.json file

The only one difference expected that will exist is the consistency of the data for the devil contract 

## Check sorted shasum

```sh
jq -S -c -M '' $HOME/.juno/config/genesis.json | sha256sum
0111ef45823cab4acd3f04afbc9a58a9bd1fe7eff278918abbadc310d7911f3b  -
```
