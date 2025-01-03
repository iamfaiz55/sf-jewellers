/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useAddProductMutation, useDeleteProductMutation, useGetAllProductsAdminQuery, useUpdateProdMutation } from '../redux/apis/adminApi'

const Dashboard = () => {
  const [editData, setEditData] = useState({})
  const { data, refetch } = useGetAllProductsAdminQuery()
  const [deleteProduct, { isSuccess: deleteSuccess, isError, error }] = useDeleteProductMutation()
  // console.log(data);\
  const [varients, setVarients] = useState()

  console.log(varients);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Product Delete Success")
    }
  }, [deleteSuccess])
  useEffect(() => {
    if (isError) {
      toast.error(error)
    }
  }, [isError])


  return <>
    <div className=''>
      {/* <Sidebar /> */}
      <div >
        <div className="flex justify-end">
          <button
            onClick={() => document.getElementById('add').showModal()}
            className="btn bg-amber-400 hover:bg-golden mr-5 transition"
          >
            Add Product
          </button>

          {/* Add Modal */}
          <dialog id="add" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add Product</h3>
              <Form refetch={refetch} />
            </div>
          </dialog>
          {/* Add Modal End */}
        </div>

        {/* Product Table and Card Display */}
        <div className="hidden sm:block overflow-x-auto shadow-md sm:rounded-lg m-5">
          {/* Table View */}
          <table className="w-full text-sm text-left text-gray-500 border-spacing-2">
            <thead className="text-xs text-gray-700 uppercase bg-light-golden dark:bg-gray-800">
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-light-golden dark:bg-gray-800 uppercase border-b border-gray-600">
                <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">#</th>
                <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Name</th>
                <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Image</th>
                <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Description</th>
                <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Variant</th>
                <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Material</th>
                <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Type</th>
                <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Purity</th>
                <th className="p-3 font-bold uppercase text-gray-600 dark:text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item, i) => {
                if (!item.isDelete) {
                  return (
                    <tr key={item._id} className="bg-light-golden hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-800 transition">
                      <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">{i + 1}</td>
                      <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">{item.name}</td>

                      {/* Display multiple images */}
                      <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">
                        <div className="flex flex-wrap justify-center gap-2">
                          {item.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt={item.name}
                              height={50}
                              width={50}
                              className="rounded-md shadow-sm"
                            />
                          ))}
                        </div>
                      </td>

                      <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">{item.mainDesc || "no description"}</td>
                      <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">
                        <button className='btn btn-circle bg-golden dark:bg-yellow-600 hover:bg-yellow-700 dark:hover:bg-yellow-500 text-black' onClick={() => {
                          document.getElementById("variant").showModal()
                          setVarients(item.varient)
                        }}>open</button>
                      </td>
                      <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">{item.material}</td>
                      <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">{item.productType}</td>
                      <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">{item.purity}</td>

                      <td className="p-3 text-gray-800 dark:text-gray-200 text-center border-b">
                        <button
                          type="button"
                          onClick={() => {
                            document.getElementById('update').showModal();
                            setEditData(item);
                          }}
                          className="btn bg-green-300 dark:bg-green-500 hover:bg-green-400 dark:hover:bg-green-400 transition"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteProduct(item._id)}
                          className="btn bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
                return null; // Handle deleted items
              })}
            </tbody>
          </table>
        </div>

        <div className="sm:hidden grid grid-cols-1 gap-4 m-5">
          {/* Card View */}
          {data && data.map((item) => {
            if (!item.isDelete) {
              return (
                <div key={item._id} className="bg-light-golden dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <div className="text-center">
                    {/* Display all images */}
                    <div className="grid grid-cols-2 gap-2">
                      {item.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          height={100}
                          width={100}
                          alt={item.name}
                          className="rounded-md mb-2"
                        />
                      ))}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">{item.name}</h4>
                  <p className="mb-2 text-gray-800 dark:text-gray-200">Description: {item.mainDesc || "No description"}</p>

                  {/* Add a button to open the variants modal */}
                  <button
                    className="btn bg-golden dark:bg-yellow-600 hover:bg-yellow-700 dark:hover:bg-yellow-500 mt-2"
                    onClick={() => {
                      document.getElementById("variant").showModal();
                      setVarients(item.varient);
                    }}>
                    View Variants
                  </button>

                  <div className="mt-4">
                    <p className="text-gray-800 dark:text-gray-200"><strong>Material:</strong> {item.material}</p>
                    <p className="text-gray-800 dark:text-gray-200"><strong>Type:</strong> {item.productType}</p>
                    <p className="text-gray-800 dark:text-gray-200"><strong>Purity:</strong> {item.purity}</p>
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => {
                          document.getElementById('update').showModal();
                          setEditData(item);
                        }}
                        className="btn bg-green-300 dark:bg-green-500 hover:bg-green-400 dark:hover:bg-green-400 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(item._id)}
                        className="btn bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
            return null; // Return null if item is deleted
          })}
        </div>


        {/* Update Modal */}
        <dialog id="update" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Product</h3>
            <Form edit={editData} refetch={refetch} />
          </div>
        </dialog>
        {/* Update Modal End */}




        <dialog id="variant" className="modal modal-bottom sm:modal-middle mt-5">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Product Variants</h3>

            {/* Check if variants exist */}
            {varients && varients.length > 0 ? (
              <div className="space-y-4 mt-2">
                {varients.map((item, index) => (
                  <div key={item._id} className="border p-4 rounded-md shadow-md bg-light-golden">
                    <h4 className="font-semibold text-md">Variant {index + 1}</h4>
                    <p><strong>Description:</strong> {item.desc}</p>
                    <p><strong>Price:</strong> ${item.price}</p>
                    <p><strong>MRP:</strong> ${item.mrp}</p>
                    <p><strong>Discount:</strong> ${item.discount}</p>
                    <p><strong>Height:</strong> {item.height}</p>
                    <p><strong>Width:</strong> {item.width}</p>
                    <p><strong>Weight:</strong> {item.prductWeight}</p>
                    <p><strong>Quantity Available:</strong> {item.quantity}</p>
                  </div>
                ))}
                <div className='text-right'>

                  <button className='btn bg-golden ' onClick={() => document.getElementById("variant").close()}> Close</button>
                </div>
              </div>
            ) : <>
              <p className="mt-4 text-gray-600">No variants available for this product.</p>
              <div className='text-right'>

                <button className='btn bg-golden ' onClick={() => document.getElementById("variant").close()}> Close</button>
              </div>
            </>

            }
          </div>


        </dialog>

      </div>
    </div>
  </>
}

const Form = ({ edit, refetch }) => {
  const [addProd, { isSuccess, isLoading, isError, error }] = useAddProductMutation();
  const [updateProd, { isSuccess: updateSuccess, isLoading: updateLoad }] = useUpdateProdMutation();
  // console.log(edit);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: edit || {
      name: "",
      images: [],
      varient: [{ price: "", mrp: "", discount: "", desc: "", height: "", width: "", prductWeight: "", quantity: "" }],
      material: "",
      productType: "",
      mainDesc: "",
      purity: "",
      // rating: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      images: yup.array().min(1, "At least one image is required"),
      varient: yup.array().of(
        yup.object({
          price: yup.number().required("Enter price"),
          mrp: yup.number().required("Enter MRP"),
          discount: yup.number(),
          desc: yup.string().required("Enter description"),
          height: yup.string().required("Enter height"),
          width: yup.string().required("Enter width"),
          prductWeight: yup.string().required("Enter product weight"),
          quantity: yup.number().required("Enter quantity"),
        })
      ),
      material: yup.string().required("Material is required"),
      productType: yup.string().required("Product type is required"),
      mainDesc: yup.string(),
      purity: yup.string().required("Purity is required"),
      // rating: yup.number().min(1).max(5).required("Rating is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const fd = new FormData();
      console.log(values);

      fd.append("name", values.name);
      fd.append("material", values.material);
      fd.append("productType", values.productType);
      fd.append("mainDesc", values.mainDesc);
      fd.append("purity", values.purity);
      // fd.append("rating", values.rating);

      values.images.forEach(file => {
        fd.append("images", file);
      });

      values.varient.forEach((variant, index) => {
        fd.append(`varient[${index}][price]`, variant.price);
        fd.append(`varient[${index}][mrp]`, variant.mrp);
        fd.append(`varient[${index}][discount]`, variant.discount);
        fd.append(`varient[${index}][desc]`, variant.desc);
        fd.append(`varient[${index}][height]`, variant.height);
        fd.append(`varient[${index}][width]`, variant.width);
        fd.append(`varient[${index}][prductWeight]`, variant.prductWeight);
        fd.append(`varient[${index}][quantity]`, variant.quantity);
      });

      if (edit) {
        updateProd({ ...edit, fd });
      } else {
        addProd(fd);
      }

      resetForm();
    },
  });

  const addVariant = () => {
    formik.setFieldValue("varient", [
      ...formik.values.varient,
      { price: "", mrp: "", discount: "", desc: "", height: "", width: "", prductWeight: "", quantity: "" },
    ]);
  };

  const removeVariant = (index) => {
    const newVariants = [...formik.values.varient];
    newVariants.splice(index, 1);
    formik.setFieldValue("varient", newVariants);
  };

  const handlePriceChange = (e, index) => {
    const { value } = e.target;
    const price = parseFloat(value);
    const mrp = formik.values.varient[index].mrp;
    const discount = mrp ? mrp - price : 0;

    formik.setFieldValue(`varient[${index}].price`, price);
    formik.setFieldValue(`varient[${index}].discount`, discount);
  };

  const handleMrpChange = (e, index) => {
    const { value } = e.target;
    const mrp = parseFloat(value);
    const price = formik.values.varient[index].price;
    const discount = price ? mrp - price : 0;

    formik.setFieldValue(`varient[${index}].mrp`, mrp);
    formik.setFieldValue(`varient[${index}].discount`, discount);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product Add Success");
      document.getElementById("add").close();
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
  }, [isError]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Product Update Success");
      document.getElementById("update").close();
      refetch();
    }
  }, [updateSuccess]);

  return (
    <div className="">
      {isLoading || updateLoad ? (
        <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
          <div className="flex space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>

          <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
          <input
            {...formik.getFieldProps("name")}
            type="text"
            placeholder="Type name"
            className="input input-bordered w-full my-2"
          />

          <input
            type="file"
            multiple
            onChange={e => {
              const files = Array.from(e.currentTarget.files);
              formik.setFieldValue("images", files);
            }}
            className="file-input file-input-bordered file-input-warning w-full"
          />

          <input
            {...formik.getFieldProps("mainDesc")}
            type="text"
            placeholder="Type Main Description"
            className="input input-bordered w-full my-2"
          />

          <select {...formik.getFieldProps("material")} className="select select-bordered w-full my-2">
            <option selected>Choose The Material</option>
            <option value={"gold"}>Gold</option>
            <option value={"diamond"}>Diamond</option>
            <option value={"bronz"}>Bronz</option>
            <option value={"white-gold"}>White-Gold</option>
            <option value={"rose-gold"}>Rose-Gold</option>
            <option value={"platinum"}>Platinum</option>
          </select>

          <select {...formik.getFieldProps("productType")} className="select select-bordered w-full my-2">
            <option selected>Choose The Type Of Product</option>
            <option value={"rings"}>Rings</option>
            <option value={"earings"}>Earrings</option>
            <option value={"necklace"}>Necklaces</option>
            <option value={"mangalsutra"}>Mangalsutra</option>
            <option value={"chain"}>Chain</option>
            <option value={"pendent"}>Pendent</option>
            <option value={"nose-pin"}>Nose-Pin</option>
            <option value={"bangles"}>Bangles</option>
            <option value={"forehead-ornament"}>Forehead-Ornament</option>
            <option value={"anklet"}>Anklets</option>
            <option value={"coins"}>Coins</option>
          </select>



          <select {...formik.getFieldProps("purity")} className="select select-bordered w-full my-2">
            <option value="">Select Purity</option>
            <option value="24">24k</option>
            <option value="18">18k</option>
          </select>

          {formik.values.varient && formik.values.varient.map((varient, index) => (
            <div key={index} className="border p-4 my-2">
              <h3 className="text-lg font-semibold">Variant {index + 1}</h3>

              <input
                {...formik.getFieldProps(`varient[${index}].price`)}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full my-2"
                onChange={(e) => handlePriceChange(e, index)}
              />
              <input
                {...formik.getFieldProps(`varient[${index}].mrp`)}
                type="number"
                placeholder="MRP"
                className="input input-bordered w-full my-2"
                onChange={(e) => handleMrpChange(e, index)}
              />

              {/* Automatically calculated discount */}
              <input
                {...formik.getFieldProps(`varient[${index}].discount`)}
                type="number"
                placeholder="Discount"
                value={formik.values.varient[index].discount || ""}
                className="input input-bordered w-full my-2"
                readOnly
              />

              <input
                {...formik.getFieldProps(`varient[${index}].desc`)}
                type="text"
                placeholder="Description"
                className="input input-bordered w-full my-2"
              />
              <input
                {...formik.getFieldProps(`varient[${index}].height`)}
                type="text"
                placeholder="Height"
                className="input input-bordered w-full my-2"
              />
              <input
                {...formik.getFieldProps(`varient[${index}].width`)}
                type="text"
                placeholder="Width"
                className="input input-bordered w-full my-2"
              />
              <input
                {...formik.getFieldProps(`varient[${index}].prductWeight`)}
                type="text"
                placeholder="Product Weight"
                className="input input-bordered w-full my-2"
              />
              <input
                {...formik.getFieldProps(`varient[${index}].quantity`)}
                type="number"
                placeholder="Quantity"
                className="input input-bordered w-full my-2"
              />

              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="btn bg-golden mt-2"
              >
                Remove Variant
              </button>
            </div>
          ))}

          {/* Button to add a new variant */}
          <button type="button" onClick={addVariant} className="btn bg-golden w-full my-2">
            Add Variant
          </button>



          <div className="modal-action">
            <button type="submit" className="btn bg-gray-400 text-black">
              {edit ? "Update" : "Add"} Product
            </button>
            <button
              type="button"
              onClick={() => {
                document.getElementById(edit ? "update" : "add").close()
              }
              }
              className="btn"
            >
              Close
            </button>
          </div>
        </form>
      )
      }
    </div >
  );
};






export default Dashboard