import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import dvideo from "../../ethereum/dvideo"
import ContributeForm from "../../components/ContributeForm";
import Link from "next/link";

class CampaignShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buffer: null,
            videos: [],
            currentHash: null,
            currentTitle: null
        }
    }

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.campaign);
        const summary = await campaign.methods.getSummary().call();
        console.log(summary)

        const farmerInfo = await campaign.methods.getFarmerInfo().call();
        console.log(farmerInfo)

        const video = await dvideo.methods.videos().call()

        return {
            address: props.query.campaign,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            fullName: farmerInfo[0],
            cropName: farmerInfo[1],
            email: farmerInfo[2],
            phoneNo: farmerInfo[3],
            location: farmerInfo[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount,
            fullName,
            email,
            phoneNo,
            location
        } = this.props;

        const items = [
            {
                header: "Personal Info",
                meta: "Personal info about the farmer",
                description:
                    `Name-${fullName} 
                    Email Address-${email}
                    Phone No-${phoneNo}
                    Location-${location}
                    `
            },
            {
                header: manager,
                meta: "Address of Manager",
                description:
                    "The manager created this campaign and can create requests to withdraw money",
                style: { overflowWrap: "break-word" }
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution (wei)",
                description:
                    "You must contribute at least this much wei to become an approver"
            },
            {
                header: requestsCount,
                meta: "Number of Requests",
                description:
                    "A request tries to withdraw money from the contract. Requests must be approved by approvers"
            },
            {
                header: approversCount,
                meta: "Number of Approvers",
                description:
                    "Number of people who have already donated to this campaign"
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign Balance (ether)",
                description:
                    "The balance is how much money this campaign has left to spend."
            }
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <h3>{this.props.cropName}</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link
                                href="/campaigns/[campaign]/requests"
                                as={`/campaigns/${this.props.address}/requests`}
                            >
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;
