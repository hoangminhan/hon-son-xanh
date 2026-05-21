export const metadata = {
  title: 'Giới Thiệu',
  description: 'Tìm hiểu về Hòn Sơn Xanh và đội ngũ của chúng tôi. Chúng tôi tự hào mang đến những trải nghiệm du lịch tốt nhất tại Hòn Sơn.',
  openGraph: {
    title: 'Giới Thiệu | Hòn Sơn Xanh',
    description: 'Tìm hiểu về Hòn Sơn Xanh và đội ngũ của chúng tôi.',
    url: 'https://honsonxanh.com/gioi-thieu',
  },
};

export default function AboutPage() {
  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">Về Hòn Sơn Xanh</h1>
        <div className="bg-white rounded-2xl p-8 shadow-sm prose prose-orange max-w-none">
          <p className="text-lg text-slate-600 mb-6">
            Hòn Sơn Xanh ra đời với mong muốn mang đến cho du khách những trải nghiệm chân thực và trọn vẹn nhất về hòn đảo xinh đẹp này. Chúng tôi không chỉ cung cấp các dịch vụ du lịch, mà còn là người bạn đồng hành chia sẻ tình yêu thiên nhiên biển đảo.
          </p>
          <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Tầm Nhìn & Sứ Mệnh</h2>
          <p className="text-slate-600 mb-4">
            Trở thành đơn vị lữ hành hàng đầu tại Hòn Sơn, mang lại những giá trị tốt nhất cho du khách, đồng thời góp phần phát triển du lịch bền vững và bảo vệ môi trường biển.
          </p>
          <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Tại sao chọn chúng tôi?</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>Am hiểu sâu sắc về địa phương.</li>
            <li>Dịch vụ tận tâm, chuyên nghiệp.</li>
            <li>Giá cả hợp lý, minh bạch.</li>
            <li>Lịch trình linh hoạt, phù hợp với mọi nhu cầu.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
