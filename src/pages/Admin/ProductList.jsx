import { useState } from "react";
import axios from "axios";

export default function ProductList({
  products,
  refresh,
}) {
  const [editProduct, setEditProduct] =
    useState(null);

  const [editName, setEditName] =
    useState("");

  const [editPrice, setEditPrice] =
    useState("");

  const [editCategory, setEditCategory] =
    useState("");

  const [
    editDescription,
    setEditDescription,
  ] = useState("");

  // COVER
  const [editCoverImage, setEditCoverImage] =
    useState(null);

  // GALLERY
  const [editImages, setEditImages] =
    useState([]);

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      refresh();

    } catch (err) {
      console.log(err);
    }
  };

  // START EDIT
  const startEdit = (product) => {
    setEditProduct(product);

    setEditName(product.name);

    setEditPrice(product.price);

    setEditCategory(product.category);

    setEditDescription(
      product.description
    );

    setEditCoverImage(null);

    setEditImages([]);
  };

  // SUBMIT EDIT
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append(
        "name",
        editName
      );

      formData.append(
        "price",
        editPrice
      );

      formData.append(
        "category",
        editCategory
      );

      formData.append(
        "description",
        editDescription
      );

      // COVER
      if (editCoverImage) {
        formData.append(
          "coverImage",
          editCoverImage
        );
      }

      // GALLERY
      editImages.forEach((img) => {
        formData.append(
          "images",
          img
        );
      });

      await axios.put(
        `http://localhost:5000/api/products/${editProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setEditProduct(null);

      refresh();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-3xl shadow-md overflow-hidden"
          >
            {/* COVER */}
            <img
              src={`http://localhost:5000${p.coverImage}`}
              alt={p.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-5">

              {/* CATEGORY */}
              <p className="text-sm uppercase text-gray-500">
                {p.category}
              </p>

              {/* NAME */}
              <h3 className="text-xl font-bold mt-1">
                {p.name}
              </h3>

              {/* PRICE */}
              <p className="text-[#804000] font-semibold mt-2">
                Rp{" "}
                {Number(
                  p.price
                ).toLocaleString("id-ID")}
              </p>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-700 mt-3 line-clamp-3">
                {p.description}
              </p>

              {/* GALLERY */}
              {p.images?.length > 0 && (
                <div className="flex gap-2 mt-4 flex-wrap">

                  {p.images.map(
                    (img, index) => (
                      <img
                        key={index}
                        src={`http://localhost:5000${img}`}
                        alt=""
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    )
                  )}
                </div>
              )}

              {/* BUTTON */}
              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    startEdit(p)
                  }
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full font-semibold"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(p._id)
                  }
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-full font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

          <div className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <h2 className="text-2xl font-bold mb-6">
              Edit Produk
            </h2>

            <form
              onSubmit={handleEditSubmit}
              className="flex flex-col gap-4"
            >

              {/* NAME */}
              <input
                type="text"
                value={editName}
                onChange={(e) =>
                  setEditName(
                    e.target.value
                  )
                }
                className="border p-3 rounded-xl"
              />

              {/* PRICE */}
              <input
                type="number"
                value={editPrice}
                onChange={(e) =>
                  setEditPrice(
                    e.target.value
                  )
                }
                className="border p-3 rounded-xl"
              />

              {/* CATEGORY */}
              <select
                value={editCategory}
                onChange={(e) =>
                  setEditCategory(
                    e.target.value
                  )
                }
                className="border p-3 rounded-xl"
              >
                <option value="">
                  Pilih Kategori
                </option>

                <option value="Top">
                  Top
                </option>

                <option value="Bottom">
                  Bottom
                </option>

                <option value="Outer">
                  Outer
                </option>

                <option value="Dress">
                  Dress
                </option>
              </select>

              {/* DESCRIPTION */}
              <textarea
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(
                    e.target.value
                  )
                }
                className="border p-3 rounded-xl h-28 resize-none"
              />

              {/* COVER */}
              <div>
                <p className="font-medium mb-2">
                  Cover Produk
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditCoverImage(
                      e.target.files[0]
                    )
                  }
                />
              </div>

              {/* GALLERY */}
              <div>
                <p className="font-medium mb-2">
                  Gallery Produk
                </p>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setEditImages(
                      Array.from(
                        e.target.files
                      )
                    )
                  }
                />
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-4">

                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-full"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setEditProduct(null)
                  }
                  className="flex-1 bg-gray-300 hover:bg-gray-400 py-3 rounded-full"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}