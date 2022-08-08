# Juno Incident Response

A repo for tracking resources related to resolving incidents on the Juno Network.

## Security Disclosures

For security disclosures, follow [these instructions](https://github.com/CosmosContracts/juno/blob/main/SECURITY.md).

## How to use this repo

1. Create a folder with the date of the incident
2. Collect resources related to root cause, and anything validators/devs will need to re-bootstrap the network
3. If you need to recover from a hard fork, both `5-April-22` and `28-July-22` have an `upgrade.md` with the steps involved
4. To restore IBC clients, follow the `ibc_client_recovery.md` guide

If there is a hardfork caused by an attack, your two options are to fork the chain to a new network, e.g. `juno-2` or to continue using `juno-1` but skip a block to avoid double-signs.

**TL;DR** as of 2022-08-08 we have chosen the latter on both occasions. To take this course:

1. Export state from the problem block -1
2. Bear in mind that this state export will contain things like registrations that have taken place in upgrade handlers. A more minimal state would require re-initialization. This is mainly a concern for testing.
3. Change the export to both a new genesis time in the future and skip a block. i.e. in the first attack the problem block was `2578097`. The chain was restarted at block `2578099`. Finally, change the state to remove any problem state, e.g. smart contract state that could be problematic
4. Patch any problems with the Juno binary to fix the security issue (or other consensus issue)
5. Get validators to turn off nodes
6. Get validators to switch binary
7. Get validators to add the export that you've sanitized as a new genesis (instructions for steps 5-7 are in the `upgrade.md` files)
8. Get validators to turn on nodes and wait for new genesis. Invariant checks likely mean the network won't come back up for between 13-23hrs.
9. When a decent number of validators (say, 5 on different OS/CPU/host strategy) have completed invariant checks, the remaining nodes can either skip invariant checks, or sync from a snapshot if the network is already live.
