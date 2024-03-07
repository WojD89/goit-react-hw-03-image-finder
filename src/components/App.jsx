import { Component } from 'react'
import { Searchbar } from './SearchBar/SearchBar'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { getImages } from 'services/api'
import { Loader } from 'components/Loader/Loader'
import { Modal } from 'components/Modal/Modal'
import { Button } from 'components/Button/Button'


export class App extends Component {
    state = {
        searchQuery: '',
        images: [],
        page: 1,
        totalPages: 0,
        isLoading: false,
        selectedImage: null,
        isModalOpen: false,
        scrollPosition: 0,
    }

    handleSearch = (query) => {
        this.fetchImages(query, 1)
    }

    async fetchImages(query, page) {
        this.setState({ isLoading: true, scrollPosition: 0 })
        try {
            const response = await getImages(query, page)
            const data = response.data.hits
            const totalPages = Math.floor(response.data.total / 12)
            this.setState({
                images: data,
                page: 1,
                totalPages: totalPages,
            })
        } catch (error) {
            this.setState({ error })
        } finally {
            this.setState({ isLoading: false })
        }
    }

    
    async loadMoreImages(query, page) {
        this.setState({ isLoading: true })

        try {
            const response = await getImages(query, page)
            const data = response.data.hits
            this.setState((prevState) => ({
                images: [...prevState.images, ...data],
            }))
        } catch (error) {
            this.setState({ error })
        } finally {
            this.setState({ isLoading: false })
        }
    }

   
    handleLoadMore = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }))
    }



    
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { page, images } = this.state

        const query = this.props.searchQuery

        if (this.props.searchQuery !== prevProps.searchQuery) {
            this.setState({ images: [], page: 1 }, () => {
                this.fetchImages(query, 1)
            })
        }
        if (this.state.page !== prevState.page) {
            this.loadMoreImages(query, page)

            this.setState({
                scrollPosition: snapshot,
            })
        }
        if (images !== prevState.images && images.length !== 0) {
            window.scrollTo({
                top: this.state.scrollPosition,
                behavior: 'smooth',
            })
        }
    }

    
    openModal = (image) => {
        this.setState({ selectedImage: image, isModalOpen: true })
    }

    
    closeModal = () => {
        this.setState({ selectedImage: null, isModalOpen: false })
    }



    render() {
        const { images, page, totalPages, isLoading, selectedImage } = this.state

        return (
            <div>
                <Searchbar onSubmit={this.handleSearch} />
                <ImageGallery images={images} openModal={this.openModal}/>
                {isLoading && <Loader />}

                {page < totalPages && (
                    <Button onClick={this.handleLoadMore}>Load more</Button>
                )}

                {selectedImage && (
                    <Modal
                        largeImageURL={this.state.selectedImage.largeImageURL}
                        tags={this.state.selectedImage.tags}
                        nnn={this.closeModal}
                    />
                )}
            </div>
        )
    }
}