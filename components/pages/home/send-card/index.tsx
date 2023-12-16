import React, { memo, useState } from "react"
import InputBorder from "components/common/input-border-v2"
import PriceOption from "./price-option"
import CardOption from "./card-option"
import { MdFileUpload } from "react-icons/md"
import { CARD_OPTIONS } from "constants/base.constant"
import DataTable, { TableColumn, Selector } from "react-data-table-component"

type DataRow = {
  id: number
  className: string
  title: string
  10000: number
  20000: number
  30000: number
  50000: number
  100000: number
  200000: number
  300000: number
  500000: number
}

const data = [
  {
    id: 1,
    className: "text-green-500 font-bold",
    title: "Không bảo hiểm",
    10000: 16,
    20000: 16,
    30000: 16,
    50000: 12.5,
    100000: 12.5,
    200000: 14,
    300000: 14,
    500000: 14
  },
  {
    id: 2,
    className: "text-black",
    title: "Bảo hiểm",
    10000: 16.5,
    20000: 16.5,
    30000: 16.5,
    50000: 13,
    100000: 13,
    200000: 14.5,
    300000: 14.5,
    500000: 14.5
  }
]

const columns: TableColumn<DataRow>[] = [
  {
    name: <div className="font-bold">{"Nhóm"}</div>,
    width: "200px",
    cell: (row: any) => <div className={"font-bold" + " " + row.className}>{row.title}</div>
  },
  {
    name: <div className="font-bold">{"10.000đ"}</div>,
    cell: (row: any) => <div className={row.className}>{row["10000"] + "%"}</div>
  },
  {
    name: <div className="font-bold">{"20.000đ"}</div>,
    cell: (row: any) => <div className={row.className}>{row["20000"] + "%"}</div>
  },
  {
    name: <div className="font-bold">{"30.000đ"}</div>,
    cell: (row: any) => <div className={row.className}>{row["30000"] + "%"}</div>
  },
  {
    name: <div className="font-bold">{"50.000đ"}</div>,
    cell: (row: any) => <div className={row.className}>{row["50000"] + "%"}</div>
  },
  {
    name: <div className="font-bold">{"100.000đ"}</div>,
    cell: (row: any) => <div className={row.className}>{row["100000"] + "%"}</div>
  },
  {
    name: <div className="font-bold">{"200.000đ"}</div>,
    cell: (row: any) => <div className={row.className}>{row["200000"] + "%"}</div>
  },
  {
    name: <div className="font-bold">{"300.000đ"}</div>,
    cell: (row: any) => <div className={row.className}>{row["300000"] + "%"}</div>
  },
  {
    name: <div className="font-bold">{"500.000đ"}</div>,
    cell: (row: any) => <div className={row.className}>{row["500000"] + "%"}</div>
  }
]

const SendCard = () => {
  const [cards, setCards] = useState(["default"])
  const [errors, setErrors] = useState([])
  const [selectedCard, setSelectedCard] = useState(CARD_OPTIONS[0].value)

  const clearErrors = () => {}
  const setValue = (key: string, value: unknown) => {}

  return (
    <div className="container">
      <div className="w-full flex flex-col gap-4 items-center justify-center py-[25px]">
        {cards.map((item: any, index: number) => {
          return (
            <>
              <div className="w-full gap-2 items-center justify-between md:flex hidden">
                <div className="w-full">
                  <CardOption />
                </div>
                <div className="w-full">
                  <InputBorder name="text" type="text" placeholder={"Mã thẻ"} errors={errors} clearErrors={clearErrors} setValue={setValue} />
                </div>
                <div className="w-full">
                  <InputBorder name="text" type="text" placeholder={"Mã seri"} errors={errors} clearErrors={clearErrors} setValue={setValue} />
                </div>
                <div className="w-full">
                  <PriceOption />
                </div>
                <div
                  className={`w-auto min-w-[70px] text-center py-[10px] px-[11px]  leading-[22px] text-white rounded-[5px] cursor-pointer ${item === "default" ? "bg-[#346448]" : "bg-red-500"}`}
                  onClick={() => {
                    if (item === "default") {
                      setCards((prev) => [...prev, "new"])
                    } else {
                      setCards((prev) => prev.filter((i: any, ind: number) => ind !== index))
                    }
                  }}
                >
                  {item === "default" ? "Thêm" : "Xóa"}
                </div>
              </div>
              <div className="w-full flex gap-2 items-center justify-between flex-wrap md:hidden ">
                <div className="w-full md:w-auto">
                  <CardOption />
                </div>
                <div className="w-full flex items-center justify-center gap-2 sm:flex-nowrap flex-wrap">
                  <div className="sm:w-1/2 w-full">
                    <InputBorder name="text" type="text" placeholder={"Mã thẻ"} errors={errors} clearErrors={clearErrors} setValue={setValue} />
                  </div>
                  <div className="sm:w-1/2 w-full">
                    <InputBorder name="text" type="text" placeholder={"Mã seri"} errors={errors} clearErrors={clearErrors} setValue={setValue} />
                  </div>
                </div>
                <div className="flex items-center justify-between w-full gap-2">
                  <div className="w-full flex-1 flex-grow">
                    <PriceOption />{" "}
                  </div>
                  <div
                    className={`flex-shrink-0 w-auto min-w-[70px] text-center py-[10px] px-[11px]  leading-[22px] text-white rounded-[5px] cursor-pointer ${
                      item === "default" ? "bg-[#346448]" : "bg-red-500"
                    }`}
                    onClick={() => {
                      if (item === "default") {
                        setCards((prev) => [...prev, "new"])
                      } else {
                        setCards((prev) => prev.filter((i: any, ind: number) => ind !== index))
                      }
                    }}
                  >
                    {item === "default" ? "Thêm" : "Xóa"}
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div>
      <div className="mx-auto max-w-[150px] bg-[#ffc107] p-5 w-auto min-w-[70px] text-center py-[10px] px-[11px] leading-[22px] text-white rounded-[5px] cursor-pointer flex items-center gap-2">
        <MdFileUpload size={20} />
        Gửi thẻ cào
      </div>

      <div className="my-5 List w-full h-auto justify-center items-start gap-2 inline-flex flex-wrap">
        {CARD_OPTIONS.map((item: any) => {
          return (
            <div
              className={`Frame1337 px-[34px] py-[9px] rounded-[10px] border border-green-800 justify-start items-start gap-2.5 flex cursor-pointer ${
                item.value === selectedCard ? "bg-green-800" : "bg-transparent"
              }`}
              onClick={() => setSelectedCard(item.value)}
            >
              <div className={`NNgDN  text-sm font-semibold font-['SVN-Gilroy'] leading-none ${item.value === selectedCard ? "text-white" : "text-green-800"}`}>{item.label}</div>
            </div>
          )
        })}
      </div>
      <DataTable className="overflow-x-hidden" columns={columns} data={data} />
    </div>
  )
}

export default memo(SendCard)
