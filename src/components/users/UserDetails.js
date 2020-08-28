import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    Segment,
    Container,
    Button,
    Card,
    Image,
    Grid,
    Header,
    Label,
    Dropdown,
    List,
} from "semantic-ui-react";
import { toast } from "react-toastify";
import { Can, Span } from "../commons";
import {
    getUserDetails,
    activateUser,
    deActivateUser,
    deleteUser,
} from "../../request";
import moment from "moment";
import { view } from "../../misc";

export class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            loading: false,
        };
    }

    componentDidMount() {
        this.fetchDetails();
    }

    fetchDetails = () => {
        getUserDetails(this.props.match.params.idx).then((response) => {
            if (response.success) {
                this.setState({ user: response.data });
                return;
            } else {
                toast("Cannot fetch user details", { type: "error" });
            }
        });
    };

    setAlert = () => {
        this.setState({
            alert: true,
        });
    };

    render() {
        const { alert, user, loading } = this.state;
        return (
            <Container>
                <div class="ui two column centered relaxed grid">
                    <div className="row">
                        <div className="twelve wide computer sixteen wide mobile column">
                            <Segment loading={loading}>
                                <Card.Content>
                                    <Card.Description>
                                        <div className="ui stackable two column grid">
                                            <div className="five wide computer sixteen wide mobile column">
                                                <Image
                                                    size="mini"
                                                    src={user.image}
                                                />
                                                <div className="">
                                                    <i className="grey user icon huge center aligned" />
                                                </div>
                                                <h2>{user.name}</h2>
                                                Status: &nbsp;
                                                {user.is_active && (
                                                    <Label
                                                        horizontal
                                                        size="tiny"
                                                        className="green"
                                                    >
                                                        Active
                                                    </Label>
                                                )}
                                                {!user.is_active && (
                                                    <Label
                                                        horizontal
                                                        size="tiny"
                                                        className="red"
                                                    >
                                                        Inactive
                                                    </Label>
                                                )}
                                                <Span
                                                    value={user.email}
                                                    child={
                                                        <div>
                                                            <i className="grey mail outline icon" />
                                                            {user.email}
                                                        </div>
                                                    }
                                                />
                                            </div>
                                            <div className="ten wide computer sixteen wide mobile column">
                                                <h3 className="page-title">
                                                    Details
                                                </h3>

                                                <List divided relaxed>
                                                    <List.Item>
                                                        <List.Content>
                                                            <Grid>
                                                                <Grid.Column
                                                                    floated="left"
                                                                    width={8}
                                                                >
                                                                    Date Joined
                                                                </Grid.Column>
                                                                <Grid.Column
                                                                    floated="right"
                                                                    width={8}
                                                                    textAlign="right"
                                                                >
                                                                    {moment(
                                                                        user.date_joined
                                                                    ).format(
                                                                        "Do MMMM, YYYY"
                                                                    )}
                                                                </Grid.Column>
                                                            </Grid>
                                                        </List.Content>
                                                    </List.Item>
                                                </List>
                                            </div>
                                        </div>
                                    </Card.Description>
                                </Card.Content>
                            </Segment>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}
