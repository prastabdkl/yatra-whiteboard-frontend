import React, { Component } from "react";
import {
    Segment,
    Container,
    Button,
    List,
    Form,
    Image,
    Menu,
    Input,
    Header,
    Grid,
    Label,
    Dropdown,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
    getAllUsers,
    getAllRoles,
    exportUser,
    getAllBranches,
    getAllBoards,
} from "../../request";
import { SearchBar, Can, FilterForm } from "../commons";
import { withLoading, withEmptyValue, withPagination } from "../hoc";
import { toast } from "react-toastify";
import { compose } from "recompose";
import _ from "lodash";

const Listing = ({ values }) => {
    return (
        <List divided verticalAlign="middle" className="listings">
            {values.map((user) => (
                <List.Item className="item">
                    <List.Content floated="right">
                        {user.roles.map((role) => (
                            <Label
                                horizontal
                                size="small"
                                className={`${role}`}
                            >
                                {role}
                            </Label>
                        ))}
                    </List.Content>
                    {user.image && <Image avatar src={user.image} />}
                    <List.Content>
                        <div>
                            <Link
                                to={{
                                    pathname: `/user/${user.idx}`,
                                    state: {
                                        profile: user,
                                    },
                                }}
                            >
                                <h3 className="ui teal header">
                                    {user.name || "No Name"}
                                </h3>
                            </Link>
                        </div>
                        <div>
                            <i className="mail outline grey icon" />
                            <small className="ui grey">{user.email}</small>
                        </div>
                    </List.Content>
                </List.Item>
            ))}
        </List>
    );
};

export class BoardList extends Component {
    state = {
        activeItem: "All",
        allUsers: [],
        searching: false,
        users: [],
        currentPage: 1,
        totalPages: 1,
        params: {},
        filter: false,
        roles: [],
        branches: [],
        fetching: true,
    };

    componentDidMount() {
        this.fetchDetails();
        getAllBranches().then((response) => {
            if (!response.success) return;
            this.setState({
                branches: response.data.records,
            });
        });
    }

    fetchDetails = async (params) => {
        await getAllBoards(params).then((response) => {
            this.setState({
                fetching: false,
            });
            if (response.success) {
                this.setState({
                    allUsers: response.data.records,
                    users: response.data.records,
                    currentPage: response.data.current_page,
                    totalPages: response.data.total_pages,
                });
            } else {
                toast(response.data.detail, { type: "error" });
            }
        });
    };

    setParams = (params) => {
        this.setState({
            params: Object.assign({}, { ...this.state.params, ...params }),
        });
    };

    activateItem = (name) => this.setState({ activeItem: name });

    searchUser = _.debounce(() => this.fetchDetails(this.state.params), 2000);

    render() {
        const ListWithPagination = compose(
            withPagination,
            withEmptyValue
        )(Listing);
        const {
            activeItem,
            searching,
            allUsers,
            users,
            currentPage,
            totalPages,
            params,
            filter,
            roles,
            branches,
            fetching,
        } = this.state;
        const filterFields = [
            {
                label: "Branch",
                name: "branch",
                type: "select",
                options: branches.map((branch) => {
                    return {
                        key: branch.name,
                        value: branch.name,
                        text: branch.name,
                    };
                }),
            },
            {
                label: "Role",
                name: "roles",
                type: "select",
                options: roles.map((role) => {
                    return {
                        key: role.name,
                        value: role.name,
                        text: role.name,
                    };
                }),
            },
        ];

        return (
            <Container>
                <Grid verticalAlign="middle">
                    <Grid.Column floated="left" width={8}>
                        <h2> Users </h2>
                    </Grid.Column>
                    <Grid.Column floated="right" width={8} textAlign="right">
                        <Link to="/users/new" className="ui button teal">
                            ADD
                        </Link>
                    </Grid.Column>
                </Grid>
                <Menu pointing>
                    <Menu.Item
                        onClick={() =>
                            this.setState({
                                filter: !filter,
                            })
                        }
                    >
                        <div>
                            <i className="sliders horizontal link icon" />{" "}
                            Filter
                        </div>
                    </Menu.Item>
                    {users.length > 0 && (
                        <Can
                            perform={[["bank-staff", true]]}
                            yes={() => (
                                <Menu.Item
                                    onClick={() =>
                                        exportUser(params).then((res) => {
                                            toast(
                                                "Your data has been exported",
                                                { type: "success" }
                                            );
                                        })
                                    }
                                >
                                    <div>
                                        <i className="download icon" /> Export
                                    </div>
                                </Menu.Item>
                            )}
                        />
                    )}
                    <Menu.Menu position="right">
                        <Menu.Item>
                            {/* <SearchBar
								values={allUsers}
								searchBy={'name'}
								onSearch={(values) => {
									this.setState({
										searching: true,
										users: values
									});
								}}
							/> */}
                            <Input
                                icon="search"
                                placeholder="Search..."
                                onChange={(e, data) => {
                                    const params = { search: data.value };
                                    this.activateItem("All");
                                    this.setParams(params);
                                    this.searchUser();
                                }}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <div
                    className="ui fluid card"
                    style={{ display: filter ? null : "none" }}
                >
                    <div className="content">
                        <FilterForm
                            fields={filterFields}
                            onSubmit={async (values) => {
                                this.setState({
                                    filter: !filter,
                                });
                                this.setParams(values);
                                await this.fetchDetails(values);
                            }}
                        />
                    </div>
                </div>

                <Segment loading={fetching} placeholder={fetching}>
                    <ListWithPagination
                        values={users}
                        activePage={currentPage}
                        onPageChange={(values) => {
                            this.fetchDetails(values);
                        }}
                        totalPages={totalPages}
                    />
                </Segment>
            </Container>
        );
    }
}
