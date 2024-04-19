import React, { Component } from 'react';
import env from "react-dotenv";
import axios from 'axios';

class Header extends Component {
    state = { 
        email:"",
        password: "",
        loggedIn: false,
        errorLogin: false,
        showHistory: false,
        historyData: []
     }

    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    getHistory = (e) => {
        e.preventDefault();
        axios.get(`${env.BACKEND_API_URL}/get-history`)
        .then(res => {
            if(res.status === 200){
                this.setState({showHistory: true, historyData: res.data.history})
            }
            else {
                this.setState({showHistory: false})
            }
        })
        .catch(error => {
            this.setState({showHistory: true})
            console.error('There was an error!', error);
        });
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        axios.post(`${env.BACKEND_API_URL}/login`, this.state)
        .then(res => {
            if(res.status === 200){
                this.setState({loggedIn: res.data.status, showHistory: true, errorLogin: false})
            }
            else {
                this.setState({errorLogin: true})
            }
        })
        .catch(error => {
            this.setState({errorLogin: true})
            console.error('There was an error!', error);
        });
    }

    render() { 

        return ( 
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Two Tier App</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                { this.state.loggedIn ? 
                    <div class="collapse navbar-collapse justify-content-end">
                        <button class="btn btn-outline-success my-2 my-sm-0" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" name='history' onClick={this.getHistory}>History Lookup</button>
                        <button class="btn btn-outline-danger my-2 my-sm-0" name='loggedIn' onClick={this.handleChange}>Log Out</button>
                    </div>
                    : 
                    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <form class="form-inline my-2 my-lg-0">
                        <input
                            class="form-control mr-sm-2"
                            type="text"
                            required
                            placeholder="Email"
                            aria-label="email"
                            value={this.state.email}
                            name="email"
                            onChange={this.handleChange}
                        />
                        <input
                            class="form-control mr-sm-2"
                            type="password"
                            required
                            placeholder="Password"
                            aria-label="password" 
                            value={this.state.password}
                            name="password"
                            onChange={this.handleChange}
                        />
                        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit" onClick={this.handleSubmit}>Login</button>
                        </form>
                    </div>
                        }
                    </nav> 
                    { this.state.errorLogin ?
                        <div class="alert alert-danger" role="alert">
                            Email/Password is wrong. Please try again...
                        </div>
                        :
                        ""
                    }

                    { this.state.showHistory ? 
                        <div>
                            <div class="collapse" id="collapseExample">
                            <div class="card border-secondary mb-3" >
                                <div class="card-header">Results History</div>
                                <div class="card-body text-secondary">
                                <table class="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Given</th>
                                        <th scope="col">Returned</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.historyData.map((d) => {
                                            return(
                                            <tr>
                                            <th scope="row">{d.id}</th>
                                            <td>{d.number}</td>
                                            <td>{d.response}</td>
                                            <td>{d.type}</td>
                                            <td>{d.time}</td>
                                            </tr>
                                        )})}
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                            </div>
                        </div>
                        : ""
                    }
            </div>

         );
    }
}
 
export default Header;