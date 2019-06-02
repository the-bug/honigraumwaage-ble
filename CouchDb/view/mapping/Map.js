function (doc) {
    if (doc.type === 'ernte') {
        emit([doc.schleuderung.jahr, [doc.schleuderung.sorte, doc.schleuderung.standort], 'ernte', doc.hiveMark], {
            "typ": "ernte",
            "hiveMark": doc.hiveMark,
            "supperMarks": doc.supperMarks
        }
        );
    } else if (doc.type === 'wiegung') {
        emit([doc.schleuderung.jahr, [doc.schleuderung.sorte, doc.schleuderung.standort], 'wiegung', doc.hiveMark], {
            "hiveMark": doc.hiveMark,
            "weight": doc.weight,
            "wirrbau": doc.wirrbau,
            "typ": "wiegung",
        });
    }
}