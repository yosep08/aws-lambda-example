exports.handler = async (event) => {
    const data = [
        { nama: 'stallman', alamat: 'new york' },
        { nama: 'linus', alamat: 'bandung' },
        { nama: 'gates', alamat: 'los angelos' },
        { nama: 'jobs', alamat: 'karapitan' },
        { nama: 'musa', alamat: 'sumedang' }
    ];
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(data),
    };
    
    return response;
};
