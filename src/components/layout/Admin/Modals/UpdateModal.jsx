import React from "react";
import PropTypes from "prop-types";

import { FiEdit3 } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const UpdateModal = ({
    show,
    onClose,
    onSubmit,
    currentItem,
    onInputChange,
    fields,
}) => {
    if (!show) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box w-3/4 max-w-2xl">
                <h3 className="font-bold text-lg">Update Info</h3>
                <form onSubmit={onSubmit}>
                    {fields.map((field) => (
                        <div key={field.name} className="form-control">
                            <label className="label">{field.label}</label>
                            {/* Handle different input types */}
                            {field.type === "text" && (
                                <input
                                    type="text"
                                    name={field.name}
                                    value={currentItem[field.name] || ""}
                                    onChange={onInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            )}

                            {field.type === "number" && (
                                <input
                                    type="number" // Render as number input
                                    name={field.name}
                                    value={currentItem[field.name] || 0} // Make sure there is a default value
                                    onChange={onInputChange}
                                    className="input input-bordered"
                                    step="0.01"
                                    required
                                />
                            )}

                            {field.type === "datetime" && (
                                <input
                                    type="datetime-local"
                                    name={field.name}
                                    value={currentItem[field.name] || ""}
                                    onChange={onInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            )}

                            {field.type === "date" && (
                                <input
                                    type="date"
                                    name={field.name}
                                    value={currentItem[field.name] || ""}
                                    onChange={onInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            )}

                            {field.type === "select" && (
                                <select
                                    name={field.name}
                                    value={currentItem[field.name] || ""}
                                    onChange={onInputChange}
                                    className={
                                        field.className ||
                                        "select select-bordered w-full"
                                    }
                                    required
                                >
                                    {field.options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {field.type === "checkbox" && (
                                <label className="cursor-pointer flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name={field.name}
                                        checked={
                                            currentItem[field.name] === "active"
                                        }
                                        onChange={(e) =>
                                            onInputChange({
                                                target: {
                                                    name: field.name,
                                                    value: e.target.checked
                                                        ? "active"
                                                        : "inactive",
                                                },
                                            })
                                        }
                                        className={
                                            field.className || "checkbox"
                                        }
                                    />
                                    <span className="label-text">
                                        {currentItem[field.name] === "active"
                                            ? field.checkboxLabels.checked
                                            : field.checkboxLabels.unchecked}
                                    </span>
                                </label>
                            )}

                            {field.type === "file" && (
                                <>
                                    <input
                                        type="file"
                                        name={field.name}
                                        multiple={field.multiple || false}
                                        onChange={onInputChange}
                                        className="file-input file-input-bordered w-full max-w-xs"
                                    />

                                    {currentItem[field.name] &&
                                        currentItem[field.name].length > 0 && (
                                            <div className="flex flex-wrap items-center space-x-2">
                                                {currentItem[field.name].map(
                                                    (file, index) => (
                                                        <img
                                                            key={index}
                                                            src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                                                            alt="file"
                                                            className="w-30 h-30 object-cover"
                                                            style={{
                                                                width: "calc(33.33% - 8px)", // 33.33% width for 3 images per row with some space
                                                                margin: "4px",
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )}
                                </>
                            )}

                            {field.type === "toggle" && (
                                <div className="flex items-center space-x-3">
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            checked={
                                                currentItem[field.name] ===
                                                "active"
                                            }
                                            onChange={(e) =>
                                                onInputChange({
                                                    target: {
                                                        name: field.name,
                                                        value: e.target.checked
                                                            ? "active"
                                                            : "inactive",
                                                    },
                                                })
                                            }
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                    <span className="mb-2">
                                        {!currentItem[field.name] ||
                                        currentItem[field.name] === "inactive"
                                            ? "inactive"
                                            : "ictive"}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="modal-action">
                        <button
                            type="submit"
                            className="btn btn-sm"
                            onClick={onSubmit}
                        >
                            <FiEdit3 />
                            Confirm
                        </button>
                        <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={onClose}
                        >
                            <RxCross2 />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

UpdateModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    currentItem: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    label: PropTypes.string.isRequired,
                    value: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                    ]).isRequired,
                })
            ),
            checkboxLabels: PropTypes.shape({
                checked: PropTypes.string,
                unchecked: PropTypes.string,
            }),
            className: PropTypes.string,
            multiple: PropTypes.bool,
        })
    ).isRequired,
};

export default UpdateModal;
