import { createContext, useContext, useState } from 'react';

const ReportContext = createContext(null);

export const ReportProvider = ({ children }) => {
    const [formData, setFormData] = useState(null);
    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const saveFormData = (data) => {
        setFormData(data);
    };

    const saveReport = (reportData) => {
        setReport(reportData);
    };

    const clearReport = () => {
        setFormData(null);
        setReport(null);
    };

    return (
        <ReportContext.Provider value={{
            formData,
            report,
            isLoading,
            setIsLoading,
            saveFormData,
            saveReport,
            clearReport
        }}>
            {children}
        </ReportContext.Provider>
    );
};

export const useReport = () => {
    const context = useContext(ReportContext);
    if (!context) {
        throw new Error('useReport must be used within a ReportProvider');
    }
    return context;
};

export default ReportContext;
