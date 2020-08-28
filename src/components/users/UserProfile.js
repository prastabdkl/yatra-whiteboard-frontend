import React, { Component } from "react";
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
    Modal,
} from "semantic-ui-react";
import { getUserProfile } from "../../request";
import { toast } from "react-toastify";
import moment from "moment";
import ChangePasswordForm from "./ChangePasswordForm";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: false,
            user: {},
            changePassword: false,
        };
    }

    componentDidMount() {
        getUserProfile().then((response) => {
            if (!response.success) {
                return toast("Cannot fetch profile details", { type: "error" });
            }
            this.setState({ user: response.data });
        });
    }

    setAlert = () => {
        this.setState({
            alert: true,
        });
    };

    setChangePassword = (value) => {
        debugger;
        this.setState({
            changePassword: value,
        });
    };

    render() {
        const { user, changePassword } = this.state;
        return (
            <Container>
                <div class="ui two column centered relaxed grid">
                    <div className="row">
                        <div className="twelve wide computer sixteen wide mobile column">
                            <div className="ui grid right aligned floated">
                                <div className="ui column">
                                    <div
                                        className="ui basic button"
                                        onClick={() =>
                                            this.setChangePassword(true)
                                        }
                                    >
                                        Change Password
                                    </div>
                                </div>
                            </div>

                            <Segment>
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
                                                <div>
                                                    <i className="grey mail outline icon" />
                                                    {user.email}
                                                </div>
                                                {/* <div>
													<i className='grey address book outline icon' />
													{user.address}
												</div>
												<div>
													<i className='grey mobile alternate icon' />
													{user.mobile}
												</div> */}
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

                                                    <List.Item>
                                                        <List.Content>
                                                            <Grid>
                                                                <Grid.Column
                                                                    floated="left"
                                                                    width={8}
                                                                >
                                                                    Branch
                                                                </Grid.Column>
                                                                {user.branch && (
                                                                    <Grid.Column
                                                                        floated="right"
                                                                        width={
                                                                            8
                                                                        }
                                                                        textAlign="right"
                                                                    >
                                                                        {
                                                                            user
                                                                                .branch
                                                                                .name
                                                                        }
                                                                    </Grid.Column>
                                                                )}
                                                            </Grid>
                                                        </List.Content>
                                                    </List.Item>
                                                </List>
                                            </div>
                                        </div>
                                    </Card.Description>
                                </Card.Content>
                            </Segment>

                            {changePassword && (
                                <Segment>
                                    <ChangePasswordForm
                                        user={user}
                                        {...this.props}
                                        onCancel={() =>
                                            this.setChangePassword(false)
                                        }
                                    ></ChangePasswordForm>
                                </Segment>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export { UserProfile };
