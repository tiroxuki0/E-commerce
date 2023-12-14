import React from "react"
import {FLASH_SALE_MODEL} from "models/promotion.model"
import Countdown from "react-countdown"
import {useLanguage} from "hooks/useLanguage"

interface Props {
    flashSale?: FLASH_SALE_MODEL
    className?: string
}

const renderer = ({days = 0, hours = 0, minutes = 0, seconds = 0, completed = false}) => {
    if (completed) return ""
    else {
        return (
            <>
                <div className="text-center whitespace-nowrap bg-white lg:px-[8px] lg:py-[4px] px-[5px] py-[2px]">
                    {
                        days
                           ? <>
                                <span className="w-[25px] inline-flex lg:h-[25px] py-[1px] items-center justify-center leading-[1px] h-auto min-h-[23px]">{days >= 10 ? days : `0${days}`}</span>
                                <div className="lg:px-[10px] px-[7px] flex items-center flex-col">
                                    <span className="countdown-dot"/>
                                    <span className="countdown-dot"/>
                                </div>
                           </> : ""
                    }
                    <>
                        <span className="w-[25px] inline-flex lg:h-[25px] py-[1px] items-center justify-center leading-[1px] h-auto min-h-[23px]">{hours >= 10 ? hours : `0${hours}`}</span>
                        <div className="lg:px-[10px] px-[7px] flex items-center flex-col">
                            <span className="countdown-dot"/>
                            <span className="countdown-dot"/>
                        </div>
                        <span className="w-[25px] inline-flex lg:h-[25px] py-[1px] items-center justify-center leading-[1px] h-auto min-h-[23px]">{minutes >= 10 ? minutes : `0${minutes}`}</span>
                    </>
                    {
                        !days
                            ? (
                                <>
                                    <div className="lg:px-[10px] px-[7px] flex items-center flex-col">
                                        <span className="countdown-dot"/>
                                        <span className="countdown-dot"/>
                                    </div>
                                    <span className="w-[25px] inline-flex lg:h-[25px] py-[1px] items-center justify-center leading-[1px] h-auto min-h-[23px]">{seconds >= 10 ? seconds : `0${seconds}`}</span>
                                </>
                            )
                            : ''
                    }
                </div>
            </>
        )
    }
}

const CountDownFlashSale: React.FC<Props> = (props) => {
    const {t} = useLanguage()

  return (
      <div className={`${props.className || ''} flex items-center text-[14px]`}>
          <p className="leading-[1]">{(props.flashSale?.timeInfo?.time_start?.getTime() <= new Date().getTime()) && (props.flashSale?.timeInfo?.time_end?.getTime() >= new Date().getTime()) ? t.endingIn : t.startingAfter}</p>
          <div>
              <Countdown date={Date.now() + ((props.flashSale?.timeInfo?.time_start?.getTime() <= new Date().getTime() && (props.flashSale?.timeInfo?.time_end?.getTime() >= new Date().getTime()) ? props.flashSale?.timeInfo?.time_end : props.flashSale?.timeInfo?.time_start) - Date.now())}
                         renderer={renderer}/>
          </div>
      </div>
  )
}

export default CountDownFlashSale
