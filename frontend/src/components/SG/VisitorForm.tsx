import React, { useState } from 'react';

const VisitorForm: React.FC = () => {
    const [showForm, setShowForm] = useState(false);

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };
    return (
        <div>
            <button
                onClick={handleToggleForm}
                className="bg-blue-600 p-2 mb-4 rounded hover:bg-blue-700 transition-colors"
            >เพิ่มข้อมูล
            </button>
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-lg font-bold mb-4">กรอกข้อมูล</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">
                                    ชื่อ:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="border p-2 w-full"
                                    placeholder="ชื่อ" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">
                                    แมวชื่อ:
                                </label>
                                <input
                                    type="text"
                                    id="แมวชื่อ"
                                    className="border p-2 w-full"
                                    placeholder="ชื่อแมว"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                            >บันทึก
                            </button>
                        </form>
                        <button
                            onClick={handleToggleForm}
                            className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700"
                        >ปิด
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisitorForm;
