import React, { Component } from "react";
import { Pagination } from "semantic-ui-react";

export const withPagination = (Component) => (props) => (
    <div>
        <Component {...props} />

        <div className="text-center">
            {props.totalPages > 1 && (
                <Pagination
                    activePage={props.currentPage}
                    onPageChange={(data, value) => {
                        props.onPageChange({ page: value.activePage });
                    }}
                    totalPages={props.totalPages}
                />
            )}
        </div>
    </div>
);
