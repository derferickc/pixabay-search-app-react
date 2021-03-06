import React, { Component } from "react"
import Saved from './Saved'
import Imagesgrid from './Imagesgrid'
import '../App.scss'

class App extends Component {
  state = {
    searchText: '',
    amount: 10,
    imageData: '',
    error: null,
    filter: '',
    saved: [],
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const apiUrl = 'https://pixabay.com/api'
    const apiKey = '13136421-266c28a6d61717bc2e4e6a83e'

    let searchTextAdjust = this.state.searchText.split(' ').join('+').toLowerCase();
    let fetchQuery = `${apiUrl}/?key=${apiKey}&q=${searchTextAdjust}&image_type=photo&per_page=${this.state.amount}&safesearch=true&category=${this.state.filter}`

    fetch(fetchQuery)
      .then(response => response.json())
      .then(
        (result) => {
          // Handle error 
          if(result.hits.length === 0) {
            this.setState({
              error: "No matching images could be found",
              imageData: ''
            })
          } else {
          // Handle the result
            this.setState({
              imageData : result,
              error: null
            });
          }
        }
      )
  }

  handleChange = (event) => {
    if(event.target.value === '') {
      this.setState({
        searchText: event.target.value,
        filter: ''
      })
    } else {
      this.setState({
        searchText: event.target.value
      })
    }
  }

  handleFilterChange = (event) => {
    if(this.state.searchText !== '') {
      let filterValue = event.target.value

      const apiUrl = 'https://pixabay.com/api'
      const apiKey = '13136421-266c28a6d61717bc2e4e6a83e'

      let searchTextAdjust = this.state.searchText.split(' ').join('+').toLowerCase();
      let fetchQuery = `${apiUrl}/?key=${apiKey}&q=${searchTextAdjust}&image_type=photo&per_page=${this.state.amount}&safesearch=true&category=${filterValue}`

      fetch(fetchQuery)
        .then(response => response.json())
        .then(
          (result) => {
            // Handle error 
            if(result.hits.length === 0) {
              this.setState({
                error: "No matching images could be found",
                imageData: '',
                filter: ''
              })
            } else {
            // Handle the result
              this.setState({
                imageData : result,
                filter: {filterValue},
                error: null
              });
            }
          }
        )
    }
  }

  componentDidMount() {
    // Check to see if local storage item key exists
    const saveImageData = JSON.parse(localStorage.getItem('localSavedImages'))

    // If it does, then set the local saved items to state saved
    if(localStorage.getItem('localSavedImages')) {
      this.setState({
        saved: saveImageData
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Check to see if the previous state.saved is different from the current one, if so, update local storage to match it
    if(prevState.saved !== this.state.saved) {
      localStorage.setItem('localSavedImages', JSON.stringify(this.state.saved))
    }
  }

  handleSaveImage = (id, previewURL) => {
    // Do not search state for id if there is only one saved id
    if(this.state.saved.length > 0) {
      const indexOfID = this.state.saved.findIndex((saved) => saved.id === id)
      // Check to see if ID already exists in the saved state
      if(indexOfID === -1) {
        this.setState((currentState) => {
          return {
            saved: currentState.saved.concat([{
              id,
              previewURL
            }])
          }
        })
        
      // If the id already exists, filter out and return the array object
      } else {
        this.setState((currentState) => {
          return {
            saved: currentState.saved.filter((saved) => saved.id !== id)
          }
        })
      }
    // if there are 0 saved items in the state, immediately add to saved state
    } else {
      this.setState((currentState) => {
        return {
          saved: currentState.saved.concat([{
            id,
            previewURL
          }])
        }
      })
    }
  }

  render() {
    const { imageData, error } = this.state
    let categories = ['fashion', 'nature', 'backgrounds', 'science', 'education', 'people', 'feelings', 'religion', 'health', 'places', 'animals', 'industry', 'food', 'computer', 'sports', 'transportation', 'travel', 'buildings', 'business', 'music']

    return (
      <div className="app-wrapper container">
        <div className="row">
          <div className="col-8 left-wrapper text-center">
            <form className='keyword-form' onSubmit={this.handleSubmit}>
              <input
                className='form-input col-12'
                type='text'
                name='searchText'
                placeholder='Keyword...'
                autoComplete='off'
                value={this.state.searchText}
                onChange={this.handleChange}
              />

              <div className="select-filter-wrapper">
                <label className="col-12">
                  <select value={this.state.filter} onChange={this.handleFilterChange} className="select-wrapper col-12">
                    <option className="option-placeholder" value="" defaultValue disabled>Category...</option>
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                className='submit-button'
                type='submit'
                disabled={!this.state.searchText}>
                Search
              </button>
            </form>

            {error &&
              <p className='center-text error'>{error}</p>
            }

            {imageData &&
              <Imagesgrid
                images={imageData.hits}
                savePicture={this.handleSaveImage}
                savedImages={this.state.saved}
              />
            }
          </div>

          <div className="col-4 right-wrapper text-left">
            <Saved savedImages={this.state.saved}/>
          </div>
        </div>
      </div>
    );
  }
}
 
export default App;