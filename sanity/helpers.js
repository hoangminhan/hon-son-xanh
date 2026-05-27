export const validateMainImage = (Rule) => 
  Rule.custom(async (image, context) => {
    if (!image || !image.asset || !image.asset._ref) return true;

    // 1. Kiểm tra kích thước (chống mờ) qua chuỗi _ref
    // Định dạng _ref của Sanity: image-IdBíMật-1200x800-jpg
    const refParts = image.asset._ref.split('-');
    if (refParts.length >= 3) {
      const dimensions = refParts[2]; // Lấy ra '1200x800'
      const [width] = dimensions.split('x').map(Number);
      
      if (width < 800) {
        return `Ảnh quá nhỏ (chiều ngang hiện tại: ${width}px). Vui lòng tải ảnh có chiều ngang tối thiểu 800px để không bị mờ trên website.`;
      }
    }

    // 2. Kiểm tra dung lượng (chống nặng) bằng cách gọi API của Sanity Client
    try {
      const client = context.getClient({ apiVersion: '2023-05-01' });
      const asset = await client.fetch('*[_id == $id][0]{ size }', { id: image.asset._ref });
      
      if (asset && asset.size) {
        const sizeInMB = asset.size / (1024 * 1024);
        if (sizeInMB > 2) {
          return `Ảnh quá nặng (${sizeInMB.toFixed(2)} MB). Vui lòng nén ảnh xuống dưới 2 MB để tiết kiệm dung lượng 5GB của hệ thống.`;
        }
      }
    } catch (err) {
      console.error("Lỗi khi kiểm tra dung lượng ảnh:", err);
    }

    return true; // Hợp lệ
  });
