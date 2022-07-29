# IBC Light Client Recovery

(credit for this guide goes to Ethereal)

## The Problem
After a chain halts and has to be rebooted from a new genesis file the issue arises that the new nodes no longer have state from pre-halt. When updating an on-chain IBC light client after the chain resumes block production, a `MsgUpdateClient` needs to be sent with a consensus state from pre-halt and so essentially a node with the old state is needed for block heights <= the height in which the network resumes block production at.

## The Solution
To get around this issue we need to hardcode an endpoint for a node that has the chains state pre-halt, which a relayer will use only when block heights from pre-halt are being referenced.

This PR in the relayer demonstrates how we achieve this: https://github.com/cosmos/relayer/pull/876

Essentially we just tell the relayer to use this old node whenever block heights from pre-halt are needed to query a consensus state. If you have a binary built from the linked PR then all you would need to do is configure the relayer with all the relevant chains and paths and then send a `MsgUpdateClient` to both of the path ends.

The command to achieve this is `rly tx update-clients path_name`

Updating the light clients on both ends once the network resumes block production should be all that is needed. Then business can carry on as usual without using a relayer that has this little hack in it.