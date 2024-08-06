# Sử dụng Node.js làm hình ảnh cơ sở
FROM node:20-alpine AS builder

WORKDIR /app

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Cài đặt tất cả các phụ thuộc
RUN npm install

# Sao chép mã nguồn ứng dụng
COPY . .

# Xây dựng ứng dụng Next.js
RUN npm run build

# Tạo một giai đoạn mới cho việc chạy ứng dụng
FROM node:20-alpine AS runner

WORKDIR /app

# Chỉ cài đặt các phụ thuộc cần thiết cho môi trường production
COPY package*.json ./
RUN npm install --production

# Sao chép ứng dụng đã xây dựng từ giai đoạn builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Khai báo biến môi trường
ENV NODE_ENV=production
ENV PORT=3000

# Mở cổng ứng dụng
EXPOSE 3000

# Chạy ứng dụng Next.js
CMD ["npm", "start"]
