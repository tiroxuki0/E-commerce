import React, {useRef, useState} from "react"
import {useLanguage} from "hooks/useLanguage"
import {Transition} from "react-transition-group"
import {FiChevronDown} from "react-icons/fi"
import {IoStar} from "react-icons/io5"

interface Props {
    selectedStar: number | null,
    handleSelectStarFilter: (star: number | null) => void
}

const StarDropdown = ({selectedStar, handleSelectStarFilter}: Props) => {
    const {t} = useLanguage()
    const nodeRef = useRef<HTMLDivElement>(null)
    const [isShow, setIsShow] = useState(false)

    const handleCloseDropdown = () => setIsShow(false)
    const handleShowDropdown = () => setIsShow(true)

    const handleSelectStar = (star: number | null) => {
        handleSelectStarFilter(star)
        handleCloseDropdown()
    }

    return (
        <div className="lg:w-fit relative w-1/2"
             onMouseOver={handleShowDropdown}
             onMouseOut={handleCloseDropdown}
        >
            <div className="flex items-center justify-between rounded-[4px] border px-[10px] py-[5px] lg:w-[167px] w-full cursor-pointer"
            >
                <span className="text-[14px]">{selectedStar ? `${selectedStar} ${t.star}` : t.review}</span>
                <FiChevronDown size={18} color="black"/>
            </div>
            <Transition nodeRef={nodeRef}
                        timeout={500}
                        unmountOnExit
                        mountOnEnter
                        in={isShow}>
                <div className="border0 rounded-[4px] shadow-mega-menu absolute top-full mt-[2px] overflow-hidden left-0 right-0 w-full bg-white z-[9]">
                    {
                        Array.from(Array(5).keys()).map(index => {
                            return (
                                <div className={`flex items-center justify-between px-[10px] py-[5px] cursor-pointer hover:bg-primary hover:text-white ${selectedStar === index + 1 ? 'text-white bg-primary' : ''}`}
                                     onClick={() => handleSelectStar(index + 1)}
                                     key={index}>
                                    <span className="text-[14px]">{index + 1} {t.star}</span>
                                    <div className="flex items-center justify-end">
                                        {
                                            Array.from(Array(index + 1).keys()).map(i => {
                                                return <IoStar className="ml-[2px]" key={`${index}${i}`} size={12} color="var(--color-star)"/>
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Transition>
        </div>
    )
}

export default StarDropdown
