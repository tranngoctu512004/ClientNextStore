# Giai đoạn xây dựng
FROM node:20-alpine AS builder

WORKDIR /app

# Sao chép các file package.json và package-lock.json
COPY package*.json ./

# Cài đặt tất cả các phụ thuộc, bao gồm các phụ thuộc phát triển để xây dựng ứng dụng
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Xây dựng ứng dụng Next.js
RUN npm run build

# Giai đoạn chạy
FROM node:20-alpine AS runner

WORKDIR /app

# Cài đặt các phụ thuộc chỉ cần thiết cho môi trường production
COPY package*.json ./
RUN npm install --production

# Sao chép các file cần thiết từ giai đoạn xây dựng
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Khai báo biến môi trường
ENV NODE_ENV=production
ENV PORT=3000

# Mở cổng ứng dụng
EXPOSE 3000

# Chạy ứng dụng Next.js
CMD ["npm", "start"]
