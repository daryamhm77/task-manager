# ✅ مدیریت تسک با Node.js و Express

پروژه‌ای ساده برای مدیریت تسک‌های کاربران با قابلیت ثبت‌نام، ورود، ایجاد، ویرایش و حذف تسک. هر کاربر فقط به تسک‌های خودش دسترسی دارد.

---

## 🔧 تکنولوژی‌های استفاده‌شده

- Node.js + Express
- MongoDB + Mongoose
- JWT برای احراز هویت
- Joi برای اعتبارسنجی ورودی‌ها
- Jest برای تست ساده
- HTML + CSS + JavaScript (فرانت‌اند ساده)
- Docker + Docker Compose

---

## 📌 امکانات

### ۱. احراز هویت (Authentication)

- ثبت‌نام کاربر: `POST /auth/signup`
- ورود و دریافت توکن JWT: `POST /auth/login`
- محافظت از مسیرها با Middleware (کاربر فقط به تسک‌های خودش دسترسی دارد)

---

### ۲. مدیریت تسک‌ها (Tasks)

- دریافت لیست تسک‌ها: `GET /tasks`
- ایجاد تسک جدید: `POST /tasks`
- ویرایش تسک: `PUT /tasks/:id`
- حذف تسک: `DELETE /tasks/:id`

---



 اعتبارسنجی ورودی‌ها

تمام ورودی‌ها با استفاده از کتابخانه Joi بررسی می‌شوند:

username and password is required and should not be less than 3 letter,
title is required and should not be less than 3 letter, description and status is optional and status should be one of (pending, in-progress, done).


 
 اجرای تست

تست‌های ساده‌ای با استفاده از Jest نوشته شده‌اند. برای اجرای آن‌ها:

npx jest


ابط کاربری ساده


یک رابط ساده با استفاده از HTML + CSS + JavaScript طراحی شده است که امکان:

ثبت‌نام و ورود
ایجاد، مشاهده، ویرایش و حذف تسک‌ها
را از طریق مرورگر فراهم می‌کند.

 اجرای پروژه با Docker

۱. ساخت فایل .env
در ریشه پروژه یک فایل .env بسازید:


JWT_SECRET=yourSecret

MONGO_URI=mongodb://mongo:27017/tasksdb





اجرای پروژه
برای بالا آوردن کل سیستم (Node.js + MongoDB) از دستور زیر استفاده کنید:


docker-compose up


 
 
 نصب و اجرای محلی (بدون Docker)


git clone https://github.com/username/task-manager-api.git
cd task-manager-api
npm install
npm run dev








\
