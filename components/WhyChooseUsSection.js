"use client";

import React from 'react';
import { CreditCard, BadgeDollarSign, RefreshCw, CalendarCheck } from 'lucide-react';

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: (
        <CreditCard className="w-16 h-16 mx-auto text-orange-500" strokeWidth={1.5} />
      ),
      title: "THANH TOÁN LINH HOẠT",
      description: "Đặt trước - Thanh toán sau - Trải nghiệm trọn vẹn"
    },
    {
      icon: (
        <BadgeDollarSign className="w-16 h-16 mx-auto text-orange-500" strokeWidth={1.5} />
      ),
      title: "CAM KẾT GIÁ TỐT NHẤT",
      description: "Giá ưu đãi nhất khi đặt trực tiếp trên website của chúng tôi"
    },
    {
      icon: (
        <RefreshCw className="w-16 h-16 mx-auto text-orange-500" strokeWidth={1.5} />
      ),
      title: "HỦY ĐỔI LINH HOẠT",
      description: "Hỗ trợ thay đổi lịch trình hoặc hủy miễn phí linh hoạt"
    },
    {
      icon: (
        <CalendarCheck className="w-16 h-16 mx-auto text-orange-500" strokeWidth={1.5} />
      ),
      title: "ĐẶT TOUR NHANH CHÓNG",
      description: "Dễ dàng kiểm tra chỗ trống và xác nhận ngay lập tức"
    }
  ];

  const getCardClasses = (index) => {
    const base = "flex flex-col text-center px-4 md:px-8 transition-all duration-300";
    
    if (index === 0) {
      return `${base} md:border-r md:border-b md:border-dashed md:border-slate-200 dark:md:border-slate-700 md:pb-8 lg:border-r lg:border-b-0 lg:pb-0`;
    } else if (index === 1) {
      return `${base} md:border-b md:border-dashed md:border-slate-200 dark:md:border-slate-700 md:pb-8 lg:border-r lg:border-b-0 lg:pb-0`;
    } else if (index === 2) {
      return `${base} md:border-r md:border-dashed md:border-slate-200 dark:md:border-slate-700 md:pt-8 lg:border-r lg:pt-0`;
    } else {
      return `${base} md:pt-8 lg:pt-0 lg:border-r-0`;
    }
  };

  return (
    <section className="py-8 bg-slate-50 dark:bg-slate-900 transition-colors relative">
      {/* Optional subtle background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F97316 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          {/* <p className="text-sm font-bold tracking-[0.2em] text-slate-400 mb-4 uppercase">Hòn Sơn Xanh</p> */}
          
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-orange-600 dark:text-orange-500 uppercase tracking-tight">
              Tại sao chọn
            </h2>
            <div className="bg-orange-500 inline-block px-10 py-3 transform -skew-x-12 shadow-sm rounded-lg">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white transform skew-x-12">
                Hòn Sơn Xanh
              </h2>
            </div>
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-lg">
            Tại Hòn Sơn Xanh, chúng tôi hiểu rằng việc chọn đúng đơn vị đồng hành là yếu tố quyết định để tạo nên một hành trình trải nghiệm khó quên.
          </p>
        </div>

        {/* Features Card */}
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={getCardClasses(index)}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-24 h-24 mx-auto bg-orange-100/50 dark:bg-orange-500/10 rounded-3xl flex items-center justify-center mb-8 rotate-3 hover:rotate-6 transition-transform shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-black text-orange-600 dark:text-orange-500 mb-4 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
