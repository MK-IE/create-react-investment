import React from "react";
import { Component } from "react";
import { writeStorage, writePostData } from "../ContactServer/ContactServer";

class UploadProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }
    handleChange(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image: image });
        }
    }
    async handleUpload(event) {
        event.preventDefault();
        if (this.state.image !== null) {
            const image = this.state.image;
            const storageCall = await writeStorage(image);
            console.log(storageCall);
            if (storageCall) {
                const getTitle = document.getElementById("title").value;
                const getDesc = document.getElementById("desc").value;
                await writePostData(getTitle, getDesc, "nobody", image.name);
                console.log("UPLOADED !");
            }
        }
    }
    render() {
        return (
            <div className="upload-project">
                <div className="container text-center">
                    <form>
                        <div className="row">
                            <div className="col">
                                <input type="text" id="title" placeholder="Enter Your Title" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <textarea name="body" id="desc" placeholder="Enter Your Description" rows="10" cols="30" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input type="file" onChange={this.handleChange} />
                            </div>
                            <div className="col">
                                <button className="btn btn-primary" onClick={this.handleUpload}>Upload</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default UploadProject;
