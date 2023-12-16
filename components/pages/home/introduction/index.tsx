import React, { memo } from "react"

const Introduction = () => {
  return (
    <div className="w-full container flex flex-col items-center justify-center">
      <div className="font-bold text-[20px] mx-auto lg:mt-[44px] mt-[34px]">Đổi thẻ cào</div>
      <div className="w-full flex flex-col items-start justify-start">
        <div className="notice font-bold text-[18px]">LƯU Ý:</div>
        <div className="text-left text-[14px] font-bold">► Không nhận thẻ cào có nguồn gốc mua từ Visa, Thẻ tín dụng, Tiki ... Thẻ lừa đảo, Phát hiện khóa v.v</div>
        <div className="text-left text-[14px] font-bold">► Không nhận thẻ ăn cắp, lừa đảo, thẻ không xác minh nguồn gốc, API game bài đấu api sẽ bị khóa vv</div>
        <div className="text-left text-[14px] font-bold">► Cần điền đúng seri, cố tình điền sai khiếu nại sẽ không xử lý.</div>
        <div className="text-left text-[14px]">► Gạch thẻ có bảo hiểm quyền lợi khi sai mệnh giá sẽ tính mệnh giá nhỏ x chiết khấu mệnh giá đó.</div>
        <div className="text-left text-[14px]">► Gạch thẻ không có bảo hiểm khi sai mệnh giá sẽ tính mệnh giá nhỏ x chiết khấu mệnh giá và trừ 50% mệnh giá nhỏ</div>
        <div className="text-left text-[14px]">
          ► Thống kê sản lượng <span className="font-bold">Tại đây</span>
        </div>
      </div>
    </div>
  )
}

export default memo(Introduction)
