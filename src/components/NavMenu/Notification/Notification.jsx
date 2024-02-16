import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { branch } from "@/redux/slices/BranchSlice";
import DataTable from "react-data-table-component";
import "react-contexify/dist/ReactContexify.css";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@/components/ui/Button";
import useDarkMode from "@/hooks/useDarkMode";
import { agent } from "@/redux/slices/Agent/AgentSlice";
import { filterAgent } from "@/redux/slices/Agent/FilterAgent";
import { agentPagination } from "@/redux/slices/Agent/AgentPagination";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import { softDeleteAgent } from "@/redux/slices/Agent/SoftDeleteAgent";
import { agentInActive } from "@/redux/slices/Agent/AgentInactive";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import noDataImage from "@/assets/images/all-img/no-data.png";

const Notification = () => {
  const [pending, setPending] = useState(false);
  const [totalRows, setTotalRows] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const dispatch = useDispatch();

  const [isDark] = useDarkMode();
  const navigate = useNavigate();
  // ----Adding style in input ----
  const inputBoxStyle = {
    backgroundColor: isDark ? "#0F172A" : "",
    padding: "12px 14px",
    border: isDark ? "1px solid white" : "1px solid black",
    height: "38px",
    borderRadius: "0.5rem",
  };
  const optionStyle = {
    backgroundColor: isDark ? "#0F172A" : "",
    border: isDark ? "1px solid white" : "1px solid black",
    borderRadius: "0.5rem",
  };
  const noDataStyle = {
    backgroundColor: isDark ? "#0F172A" : "",
    color: isDark
      ? "rgb(203 213 225 / var(--tw-text-opacity))"
      : "rgb(15 23 42 / var(--tw-text-opacity))",
  };
  // ---applying custom styling
  const customStyles = {
    header: {
      // For Heading
      style: {
        minheight: "56px",
        color: isDark ? "rgb(203 213 225 / var(--tw-text-opacity));" : "green",
        fontWeight: "bold",
        backgroundColor: isDark
          ? " rgb(30 41 59 / var(--tw-bg-opacity))"
          : "rgb(226 232 240 / var(--tw-bg-opacity))",
      },
    },
    subHeader: {
      style: {
        backgroundColor: isDark
          ? " rgb(30 41 59 / var(--tw-bg-opacity))"
          : "white",
        padding: "1.25rem",
        fontSize: "1.125rem",
        fontWeight: "500",
        lineHeight: "24px",
        color: isDark
          ? "rgb(203 213 225 / var(--tw-text-opacity))"
          : "rgb(15 23 42 / var(--tw-text-opacity))",
      },
    },
    headRow: {
      style: {
        color: isDark
          ? "rgb(203 213 225 / var(--tw-text-opacity))"
          : "rgb(71 85 105 / var(--tw-text-opacity))",
        fontSize: "0.75rem",
        fontWeight: "bold",
        backgroundColor: isDark
          ? ""
          : "rgb(226 232 240 / var(--tw-bg-opacity))",
        // FontFamily: "Inter, sans-serif",
        lineHeight: "1rem",
        textTransform: "uppercase",
        textOpacity: "1",
        letterSpacing: "1px",
        textAlign: "center",
      },
    },
    // headcell
    headCells: {
      style: {
        backgroundColor: isDark ? "rgb(51 65 85 / var(--tw-bg-opacity))" : "",
        color: isDark
          ? "rgb(203 213 225 / var(--tw-text-opacity))"
          : "rgb(71 85 105 / var(--tw-text-opacity))",

        fontWeight: "bold",
        fontSize: "0.75rem",
        textAlign: "center",
        paddingTop: "20px",
        paddingBottom: "15px",
      },
    },
    cells: {
      style: {
        backgroundColor: isDark ? " rgb(30 41 59 / var(--tw-bg-opacity))" : "",
        color: isDark
          ? "rgb(203 213 225 / var(--tw-text-opacity))"
          : "rgb(71 85 105 / var(--tw-text-opacity))",
        fontSize: "0.875rem",
        padding: "1.25rem",
        // FontFamily: "Inter, sans-serif",
        lineHeight: "1rem",
        // textTransform: "capitalize",
        textOpacity: "1",
        letterSpacing: "1px",
        textAlign: "center",
      },
    },
    selectableRows: {
      style: {
        backgroundColor: "red",
        color: "red",
      },
    },
    pagination: {
      style: {
        backgroundColor: isDark
          ? "rgb(30 41 59 / var(--tw-bg-opacity))"
          : "white",
        color: isDark
          ? "rgb(203 213 225 / var(--tw-text-opacity))"
          : "rgb(71 85 105 / var(--tw-text-opacity))",
        fontSize: "15px",
      },
    },
  };

  const handleView = (row) => {
    const id = row._id;
    navigate("/layout/view-agents", { state: { id, pathName } });
  };
  // const handleDelete = (row) => {
  //   const id = row._id;
  //   Swal.fire({
  //     title: `Are you Sure Want to Delete ${
  //       row.firstName + " " + row.lastName
  //     } Agent`,
  //     icon: "error",
  //     showCloseButton: true,
  //     showCancelButton: true,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       dispatch(softDeleteAgent(id))
  //         .then((res) => {
  //           dispatch(agent());
  //           toast.success(res.payload.data.message);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   });
  // };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
    },
    {
      name: "Contact Number",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "City",
      selector: (row) => row.city,
    },
    {
      name: "Status",
      sortable: true,

      selector: (row) => {
        return (
          <span className="block w-full">
            <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25  ${
                row?.isActive === true ? "text-success-500 bg-success-500" : ""
              } 
            ${row?.isActive === false ? "text-warning-500 bg-warning-500" : ""}
           
            
             `}
              title={
                row?.isActive === true
                  ? "Click to deactivate"
                  : "Click to activate"
              }
              onClick={() => handleActive(row)}
            >
              {row.isActive === true ? "Active" : "In Active"}
            </span>
          </span>
        );
      },
    },

    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="flex  space-x-1 rtl:space-x-reverse ">
            <Tooltip
              content="View"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleView(row)}
              >
                <Icon icon="heroicons:eye" />
              </button>
            </Tooltip>
            <Tooltip
              content="Edit"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleEdit(row)}
              >
                <Icon icon="heroicons:pencil-square" />
              </button>
            </Tooltip>
            <Tooltip
              content=" Delete"
              placement="top"
              arrow
              animation="shift-away"
              theme="danger"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleDelete(row)}
              >
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
            {/* Active or Inactive */}
            {/* {row.isActive ? (
              <Tooltip
                content="In Active"
                placement="top"
                arrow
                animation="shift-away"
                // theme="danger"
              >
                <button
                  className="action-btn"
                  type="button"
                  onClick={() => handleInactive(row)}
                >
                  <Icon icon="heroicons:bolt" />
                </button>
              </Tooltip>
            ) : (
              <Tooltip
                content="Aactive"
                placement="top"
                arrow
                animation="shift-away"
                // theme="danger"
              >
                <button
                  className="action-btn"
                  type="button"
                  onClick={() => handleActive(row)}
                >
                  <Icon icon="heroicons:bolt-slash" />
                </button>
              </Tooltip>
            )} */}
          </div>
        );
      },
    },
  ];
  // const [records, setRecords] = useState([]);
  // useEffect(() => {
  //   setRecords(
  //     agentList?.data?.listAgents?.map((item) => ({
  //       ...item,
  //       firstName: item?.firstName,
  //       lastName: item?.lastName,
  //       city: item?.city,
  //       branchId: item?.branchId,
  //       email: item?.email,
  //       phone: item?.phone,
  //       deletedAt: item?.deletedAt,
  //       _id: item?._id,
  //     })) || []
  //   );
  // }, [agentList, setRecords]);

  // ---------filtering data after a search -------
  const [filterData, setFilterData] = useState();
  const [keyWord, setkeyWord] = useState("");
  // let keyWord = "";
  // const handleFilter = (e) => {
  //   let newkeyWord = e.target.value;
  //   setkeyWord(newkeyWord);
  //   setTimeout(() => {
  //     dispatch(filterAgent(newkeyWord))
  //       .then((res) => {
  //         setFilterData(res.payload.data.listAgents);
  //       })
  //       .catch((error) => console.log(error, "error"));
  //   }, 1000);
  // };

  // ----Applying Server-Side Pagination -------

  // const [paginationData, setPaginationData] = useState(records);

  // useEffect(() => {
  //   const fetchData = async (page) => {
  //     try {
  //       const response = await dispatch(
  //         agentPagination({ page, keyWord, perPage })
  //       );
  //       const data = response.payload.data.listAgents;
  //       setPaginationData(data);
  //       setTotalRows(response.payload.data.count);
  //       setPending(false);
  //     } catch (error) {
  //       console.log(error);
  //       setPending(false);
  //     }
  //   };
  //   fetchData(page);
  // }, [agentList, setPaginationData]);

  // ------Performing Action when page change -----------
  // const handlePageChange = (page) => {
  //   dispatch(agentPagination({ page, keyWord, perPage }))
  //     .then((res) => {
  //       setPaginationData(res.payload.data.listAgents);
  //       setPage(page);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // ------Handling Action after the perPage data change ---------
  // const handlePerRowChange = (perPage) => {
  //   dispatch(agentPagination({ page, keyWord, perPage }))
  //     .then((res) => {
  //       setPaginationData(res.payload.data.listAgents);
  //       setPerPage(perPage);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const handleBack = () => {
    navigate("/layout/dashboard");
  };
  return (
    // <Card>
    <div className={`${isDark ? "bg-secondary-900   text-white" : ""}`}>
      <div className="text-end mb-4">
        <div className="flex gap-5 justify-between">
          <div>
            <Button
              type="button"
              text="Back"
              className={`${
                isDark
                  ? "btn bg-secondary-500  font-bold  text-black-500"
                  : "btn btn-dark"
              }  text-center ml-5 mt-5 py-2  rounded-lg`}
              // onClick={handleBack}
            />
          </div>
          <div>
            <Button
              type="submit"
              // text="Add Agent"
              text="Add Agent"
              className={`${
                isDark
                  ? "btn bg-secondary-500  font-bold  text-black-500"
                  : "btn btn-dark"
              }   block text-center ml-5 mt-5 py-2  rounded-lg`}
              // onClick={handleAddAgent}
            />
          </div>
        </div>
      </div>
      <DataTable
        // columns={columns}
        // data={keyWord === "" ? paginationData : filterData}
        highlightOnHover
        customStyles={customStyles}
        fixedHeader
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        // onChangePage={handlePageChange}
        // onChangeRowsPerPage={handlePerRowChange}
        selectableRows
        pointerOnHover
        progressPending={pending}
        subHeader
        // subHeaderComponent={subHeaderComponent}
        noDataComponent={
          <div>
            <p className="text-center text-bold text-2xl" style={noDataStyle}>
              No data Found
            </p>
            <img src={noDataImage} alt="No Data Image" style={noDataStyle} />
          </div>
        }
      />
    </div>
    // </Card>
  );
};

export default Notification;
