export const styles = {
    borderCollapse: 'separate',
    borderRadius: 2,
    mb: 2,
    mt: 2,
    width: '30rem',
    height: '5rem',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '& .MuiTableRow-root:last-of-type': {
        borderBottomLeftRadius: 6.5,
        borderBottomRightRadius: 6.5,
        '& .MuiTableCell-root:last-of-type': {
            borderBottom: 0,
        },
    },
    '& .MuiTableCell-head': {
        backgroundColor: '#1976d2',
        border: 'solid 1px',
        borderColor: '#1976d2',
        borderTopLeftRadius: 6.5,
        borderTopRightRadius: 6.5,

    },
};

export const typoStyles = {
    display: 'inline-flex',
    alignItems: 'center'
};

export const cellStyles = {
    m: 0,
    p: 0,
    border: 'none',
}; 