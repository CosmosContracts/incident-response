## Full Juno Data Export

### Primary Servers
- https://static.ezstaking.io/juno-default-pruning-with-indexer.tar.gz
- https://static-2.ezstaking.io/juno-default-pruning-with-indexer.tar.gz
- https://static-3.ezstaking.io/juno-default-pruning-with-indexer.tar.gz

### Load Balancing from Primary Servers
- https://snapshots.ezstaking.io/juno-default-pruning-with-indexer.tar.gz

## Data Export Hash

### Primary Servers

- https://static.ezstaking.io/juno-default-pruning-with-indexer.tar.gz.sha256
- https://static-2.ezstaking.io/juno-default-pruning-with-indexer.tar.gz.sha256
- https://static-3.ezstaking.io/juno-default-pruning-with-indexer.tar.gz.sha256

### Load Balancing from Primary Servers
- https://snapshots.ezstaking.io/juno-default-pruning-with-indexer.tar.gz.sha256

## Instructions to back up data
Everyone should back up their data directory and private keys before attempting any recovery methods.

Stop your node first and run:

`tar czf juno_snapshot.tar.gz -C ~/.juno/data .`
