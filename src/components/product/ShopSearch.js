import React from "react";
import { useState } from "react";
const ShopSearch = ({ setFilterSortName }) => {
    const [dataInput, setDataInput] = useState("");
    const resetData = () => {
        setFilterSortName("");
        setDataInput("");
    };
    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Tìm kiếm</h4>
            <div className="pro-sidebar-search mb-50 mt-25">
                <form className="pro-sidebar-search-form" action="#">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={dataInput}
                        onChange={(e) => setDataInput(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setFilterSortName(dataInput)}
                    >
                        <i className="pe-7s-search" />
                    </button>
                </form>
                {dataInput.length > 0 && (
                    <button
                        className=" mb-50 mt-25 btn btn-danger"
                        type="button"
                        onClick={() => resetData()}
                    >
                        Làm mới
                    </button>
                )}
            </div>
        </div>
    );
};

export default ShopSearch;
