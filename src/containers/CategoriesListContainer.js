import React, {useEffect} from 'react'
import { connect, useDispatch } from 'react-redux'
import CategoriesList from '../components/CategoriesList'
import { getAllCategories } from '../actions/categories'
import { addToCart } from '../actions/cart'

const CategoriesListContainer = ({ categoriesList, pageCount, paginationActionNext, paginationActionPrevious }) => {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllCategories())
  }, [pageCount, dispatch])

  const handleAddToCart = (post) => {
    dispatch(addToCart(post))
  }
  
  return (
    <CategoriesList
      categoriesList={categoriesList}
      paginationActionNext={paginationActionNext}
      paginationActionPrevious={paginationActionPrevious}
      handleAddToCart={handleAddToCart}
      />
  )
}

const mapStateToProps = (state) => ({
  //TODO: change categories.categories
  categoriesList: state.categoriesList.displayCategories,
  cartHash: state.cartHash
})

// const mapDispatchToProps = dispatch => ({
//   paginationActionNext: () => dispatch(paginationActionNext()),
//   paginationActionPrevious: () => dispatch(paginationActionPrevious()),
// })

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(CategoriesListContainer)
