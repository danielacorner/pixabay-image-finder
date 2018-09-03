import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
// import SelectField from 'material-ui/SelectField';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, Select, InputLabel } from '@material-ui/core';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

class Search extends Component {
  state = {
    searchText: '',
    amount: 15,
    apiUrl: 'https://pixabay.com/api',
    apiKey: '9998038-0e3c22c55a18230da1d4d46f9',
    images: []
  };

  onTextChange = e => {
    const { apiUrl, apiKey, searchText, amount } = this.state;

    const val = e.target.value;

    // onchange, set searchText state to search value then callback the api
    this.setState({ [e.target.name]: val }, () => {
      if (val === '') {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}&safeSearch=false`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      }
    });
  };

  onAmountChange = (e, i, value) => this.setState({ amount: e.target.value });

  render() {
    const { images } = this.state;
    console.log(images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          // hintText=""
          // errorText=""
          floatingLabelText="Search For Images"
          fullWidth={true}
          // multiLine={false}
          // rows={1}
        />
        <br />
        <FormControl>
          <InputLabel htmlFor="amount-simple">Amount</InputLabel>
          <Select
            name="amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
            inputProps={{
              name: 'amount',
              id: 'amount-simple'
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <br />
        {images.length > 0 && <ImageResults images={images} />}
      </div>
    );
  }
}

export default Search;
