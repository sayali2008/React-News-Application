import React from 'react';
import commentBox from 'commentbox.io';
import {myInitObject} from '../Detailed';



class Comment extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.removeCommentBox = commentBox('5655553393033216-proj');
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {
        return (
           
            <div className="commentbox" id = {this.props.id}/>
        );
    }
}

export default Comment