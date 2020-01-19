import { baseUrl } from '../baseUrl';

export const fetchData = function(name)  {
    this.setState(state => ({
        [name]: {
            isLoading: true,
            [name]: [],
            errMess: null
        }
    }));
    fetch(baseUrl + name + '/Read?from=0', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                return res;
            }
            else {
                var err = new Error('Error ' + res.status + ' : ' + res.statusText);
                err.response = res;
                throw err;
            }
        }, err => {
            let error = new Error(err.message);
            throw error;
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState(state => ({
                [name]: {
                    isLoading: false,
                    [name]: data,
                    errMess: null
                }
            }));
            if(this.props.setParentData){
                this.props.setParentData({
                    [name]: data,
                });
            }
        })
        .catch(err => {
            console.log(err);
            this.setState(state => ({
                [name]: {
                    isLoading: false,
                    [name]: [],
                    errMess: err.message
                }
            }));
        });
}


export const fetchIndividualData = function(name, id)  {
    this.setState(state => ({
        [name]: {
            isLoading: true,
            [name]: [],
            errMess: null
        }
    }));
    fetch(baseUrl + name + 's/' + id, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                return res;
            }
            else {
                var err = new Error('Error ' + res.status + ' : ' + res.statusText);
                err.response = res;
                throw err;
            }
        }, err => {
            let error = new Error(err.message);
            throw error;
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState(state => ({
                [name]: {
                    isLoading: false,
                    [name]: data,
                    errMess: null
                }
            }));
            if(this.props.setParentData){
                this.props.setParentData({
                    [name]: data,
                });
            }
        })
        .catch(err => {
            console.log(err);
            this.setState(state => ({
                [name]: {
                    isLoading: false,
                    [name]: [],
                    errMess: err.message
                }
            }));
        });
}