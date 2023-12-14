import React, {useRef, useState} from "react"
import {useLanguage} from "hooks/useLanguage"
import {Transition} from "react-transition-group"
import {FiChevronDown} from "react-icons/fi"
import {REVIEW_TYPES} from "constants/product.constant"
import {DEFAULT_LANGUAGE} from "constants/base.constant"

interface Props {
    selectedType: string | null,
    handleSelectTypeFilter: (type: string | null) => void
}

const TypeDropdown = ({selectedType, handleSelectTypeFilter}: Props) => {
    const {locale} = useLanguage()
    const nodeRef = useRef<HTMLDivElement>(null)
    const [isShow, setIsShow] = useState(false)

    const handleCloseDropdown = () => setIsShow(false)
    const handleShowDropdown = () => setIsShow(true)

    const handleSelectType = (type: string | null) => {
        handleSelectTypeFilter(type)
        handleCloseDropdown()
    }

    return (
        <div className="lg:w-fit w-1/2 relative ml-[10px]"
             onMouseOver={handleShowDropdown}
             onMouseOut={handleCloseDropdown}
        >
            <div className="flex items-center justify-between rounded-[4px] border px-[10px] py-[5px] lg:w-[167px] w-full cursor-pointer"
            >
                <span className="text-[14px]">{REVIEW_TYPES.find((item: any) => item.value === selectedType)?.label[locale || DEFAULT_LANGUAGE]}</span>
                <FiChevronDown size={18} color="black"/>
            </div>
            <Transition nodeRef={nodeRef}
                        timeout={500}
                        unmountOnExit
                        mountOnEnter
                        in={isShow}>
                <div className="border0 rounded-[4px] shadow-mega-menu absolute top-full mt-[2px] overflow-hidden left-0 right-0 w-full bg-white z-[9]">
                    {
                        REVIEW_TYPES.map((type, index) => {
                            return (
                                <div className={`flex items-center text-[14px] justify-between px-[10px] py-[5px] cursor-pointer hover:bg-primary hover:text-white ${selectedType === type.value ? 'text-white bg-primary' : ''}`}
                                     onClick={() => handleSelectType(type.value)}
                                     key={index}
                                >{type.label[locale || DEFAULT_LANGUAGE]}</div>
                            )
                        })
                    }
                </div>
            </Transition>
        </div>
    )
}

export default TypeDropdown
