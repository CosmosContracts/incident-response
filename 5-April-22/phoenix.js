const fs = require('fs')

const initialHeightRegex = /"initial_height":.*?,/
const genesisTimeRegex = /"genesis_time":.*?,/

// Notice how wildcard will match any value for the contract state (up to the next ")
const contractStateRegex = /{"contract_address":"juno188lvtzkvjjhgzrakha6qdg3zlvps3fz6m0s984e0wrnulq4px9zqhnleye","contract_info":{"admin":"","code_id":"184","created":null,"creator":"juno1hxkppd7spnvm5s86z2rfze5pndg9wwee8g9x6v","extension":null,"ibc_port_id":"","label":"satoshi-test"},"contract_state":\[{"key":"636F6E74726163745F696E666F","value":"eyJjb250cmFjdCI6ImNyYXRlcy5pbzpoZWxsby13b3JsZCIsInZlcnNpb24iOiIwLjAuMSJ9"},{"key":"7374617465","value":".*?"}\]},/

const upgradeProposalRegex = /"@type":"\/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal","description":"# Juno Lupercalia Phase 1.*"upgraded_client_state":null},/

// removes "plan" property and changes type to text
const replacedAsTextProposalWithNote = '"@type":"/cosmos.gov.v1beta1.TextProposal","description":"# Juno Lupercalia Phase 1\\\\n\\\\nNote: this upgrade _takes no direct action on the ongoing CCN issue_.\\\\n\\\\nThis upgrade is functional in nature, and contains:\\\\n\\\\n* Security fixes\\\\n* Performance improvements\\\\n* An upgrade to CosmWasm/wasmd 0.24.0\\\\n* Moves Juno to mainline CosmWasm/wasmd rather than a fork\\\\n* Upgrades to Cosmos SDK 45 and Tendermint 0.34.16\\\\n\\\\nCrucially, the upgrades to the CosmWasm module allow for _governance to execute smart contracts_.\\\\n\\\\nThis feature is required by the Unity Prop Smart Contract.\\\\n\\\\nThe target block for this upgrade is 2582000, which should arrive +/- an hour of 1700UTC on Tuesday 5th April 2022.\\\\n\\\\nFor more information, you can read [this post](https://medium.com/@JunoNetwork/jun%C3%B8-lupercalia-upgrade-89b7f3a7bfdc) on the Juno Medium.\\\\n\\\\nTo see the full changelog, [go here](https://github.com/CosmosContracts/juno/releases/tag/v2.3.0).\\\\nNOTE: this proposal was changed to a text proposal due to the chain halt on 4/4/2022. This upgrade was applied upon chain restart at block 2578099.\\\\n\\\\n",'

const newGenesisTime = "2022-04-07T21:00:00Z"
const newInitialHeight = "2578099"
const reinitializedContractState = '{"contract_address":"juno188lvtzkvjjhgzrakha6qdg3zlvps3fz6m0s984e0wrnulq4px9zqhnleye","contract_info":{"admin":"","code_id":"184","created":null,"creator":"juno1hxkppd7spnvm5s86z2rfze5pndg9wwee8g9x6v","extension":null,"ibc_port_id":"","label":"satoshi-test"},"contract_state":[{"key":"636F6E74726163745F696E666F","value":"eyJjb250cmFjdCI6ImNyYXRlcy5pbzpoZWxsby13b3JsZCIsInZlcnNpb24iOiIwLjAuMSJ9"},{"key":"7374617465","value":"eyJjb3VudCI6MCwib3duZXIiOiJqdW5vMWh4a3BwZDdzcG52bTVzODZ6MnJmemU1cG5kZzl3d2VlOGc5eDZ2IiwibmFtZSI6IiJ9"}]},'

// read unchanged file from first arg
const unchangedFile = fs.readFileSync(process.argv[2])

const outputFileName = process.argv[3]

// hack for 512MB string limit in node
const firstChunk = unchangedFile.slice(0, 0x1f0fffe8).toString('utf8')
const secondChunk = unchangedFile.slice(0x1f0fffe8).toString('utf8')

console.log('first chunk matches upgrade', firstChunk.match(upgradeProposalRegex) != null)
console.log('second chunk matches contract', secondChunk.match(contractStateRegex) != null)

// upgrade proposal is in first chunk
const replacedFirstChunk = firstChunk.replace(upgradeProposalRegex, replacedAsTextProposalWithNote)

// initial_height, genesis_time, and satoshi-test contract state are in second chunk
const replacedSecondChunk = secondChunk
.replace(initialHeightRegex, `"initial_height":"${newInitialHeight}",`)
.replace(genesisTimeRegex, `"genesis_time":"${newGenesisTime}",`)
.replace(contractStateRegex, reinitializedContractState)

fs.writeFileSync(outputFileName, replacedFirstChunk, {encoding: 'utf8'})
fs.appendFileSync(outputFileName, replacedSecondChunk, {encoding: 'utf8'})
