const { google } = require('googleapis');
const sheets = google.sheets({ version: 'v4', auth: '' });

async function updateSheet(uploadDate, uploaderName) {
    const request = {
        spreadsheetId: '100JtKzrKi0uYMLFKYQTPEOSnuxOL1WkBfhvaBP932MI',  // ID של הגיליון שלך
        range: 'Sheet1!A1',  // מיקום הגיליון שברצונך להוסיף אליו את המידע
        valueInputOption: 'RAW',
        resource: {
            values: [
                [uploadDate, uploaderName],  // התאריך ושם המעלה
            ],
        },
    };

    try {
        await sheets.spreadsheets.values.append(request);
        console.log('Sheet updated successfully');
    } catch (error) {
        console.error('Error updating sheet:', error);
    }
}

// לדוגמה, קריאה לפונקציה
updateSheet('2024-11-21', 'מיכל');
