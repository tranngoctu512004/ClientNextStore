import { cookies } from "next/headers";
import envConfig from "@/config";

export default async function PageProfile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  let user = null;
  let errorMessage = null;

  try {
    const result = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken?.value}`,
        },
      },
    ).then(async (res) => {
      const payload = await res.json();
      const data = {
        status: res.status,
        payload,
      };

      if (!res.ok) {
        throw data;
      }
      return data;
    });

    user = result.payload;
  } catch (error) {
    errorMessage = error.payload?.error || "Failed to fetch user information.";
    console.error("Failed to fetch user information:", error);
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 mt-10 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Hồ Sơ Của Tôi</h1>
        {errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
              <p className="text-2xl font-semibold">{user?.name}</p>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold">Thông Tin Cá Nhân</h2>
              <form className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600">Tên Đăng Nhập</label>
                    <input
                      type="text"
                      value="tran30950@gmail.com"
                      className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Tên</label>
                    <input
                      type="text"
                      value="Trần Ngọc Tú"
                      className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Email</label>
                    <input
                      type="email"
                      value="tran30950@gmail.com"
                      className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Số Điện Thoại</label>
                    <input
                      type="text"
                      value=""
                      className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Giới Tính</label>
                    <select className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md">
                      <option>Nam</option>
                      <option>Nữ</option>
                      <option>Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600">Ngày Sinh</label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        placeholder="Ngày"
                        className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Tháng"
                        className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Năm"
                        className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-600">
                      Thông tin nhận hàng
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <select className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md">
                        <option>-- Chọn tỉnh --</option>
                        {/* Các tỉnh thành khác */}
                      </select>
                      <select className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md">
                        <option>-- Chọn quận/huyện --</option>
                        {/* Các quận huyện khác */}
                      </select>
                      <select className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md">
                        <option>-- Chọn xã/phường --</option>
                        {/* Các xã phường khác */}
                      </select>
                      <input
                        type="text"
                        placeholder="Địa chỉ"
                        className="border border-gray-300 px-3 py-2 mt-1 col-span-3 w-full rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-end">
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
