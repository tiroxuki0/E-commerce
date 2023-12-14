import React, {useState} from "react"
import ReactPaginate from "react-paginate"
import StarDropdown from "./star-dropdown"
import TypeDropdown from "./type-dropdown"
import ReviewItem from "./review-item"
import ModalMedia from "components/common/product/modal-media"
import NoData from "components/common/no-data"
import {useProductReview} from "stores/product-review"
import {PRODUCT_MEDIA_MODEL} from "models/product.model"
import {FiChevronLeft, FiChevronRight} from "react-icons/fi"

const ReviewList = () => {
    const [storeReview, actionReview] = useProductReview()
    const [isShowModal, setIsShowModal] = useState(false)

    const handleCloseDrawer = () => setIsShowModal(false)

    const handleSelectedMedia = (index: number, mediaList: PRODUCT_MEDIA_MODEL[]) => {
        actionReview.handleSelectedReviewMedia(mediaList, index)
        setIsShowModal(true)
    }

    const handleChangePage = async (item: {selected: number}) => {
        await actionReview.handleSelectPage(item.selected + 1)
    }

    return (
        <>
            <div className="lg:mt-[45px] mt-[16px]">
                <div className="flex items-center w-full">
                    <StarDropdown selectedStar={storeReview.filter.totalStar}
                                  handleSelectStarFilter={actionReview.handleSelectStarFilter}/>
                    <TypeDropdown selectedType={storeReview.filter.type}
                                  handleSelectTypeFilter={actionReview.handleSelectTypeFilter}/>
                </div>
                <div className="lg:mt-[30px] mt-[16px]">
                    {
                        (storeReview.reviewsByProduct?.reviews && storeReview.reviewsByProduct.reviews.length > 0) &&
                        storeReview.reviewsByProduct.reviews.map((review, index) => {
                            return <ReviewItem item={review}
                                               handleSelectedMedia={handleSelectedMedia}
                                               key={index}/>
                        })
                    }
                    {
                        (!storeReview.reviewsByProduct?.reviews || storeReview.reviewsByProduct?.reviews?.length === 0) &&
                        <NoData title={"noReviewYet"} imageUrl="/images/img-no-review.webp"/>
                    }
                </div>
                {
                    storeReview.reviewsByProduct?.totalRecords > 1 &&
                    <ReactPaginate
                        className={'flex justify-center items-center pl-0 text-[14px] pagination'}
                        activeClassName="pagination-active"
                        pageClassName="pagination-item"
                        previousClassName="pagination-nav"
                        nextClassName="pagination-nav"
                        breakLabel="..."
                        onPageChange={handleChangePage}
                        pageRangeDisplayed={3}
                        pageCount={Math.round(storeReview.reviewsByProduct.totalRecords / storeReview.filter.perPage)}
                        renderOnZeroPageCount={null}
                        previousLabel={<FiChevronLeft />}
                        nextLabel={<FiChevronRight />}
                    />
                }
            </div>
            {
                isShowModal &&
                <ModalMedia
                    closeDrawer={handleCloseDrawer}
                    status={isShowModal}
                    mediaList={storeReview.reviewMediaList}
                    changeActiveMedia={() => {}}
                    activeIndex={storeReview.reviewMediaActiveIndex}
                />
            }
        </>
    )
}

export default ReviewList
