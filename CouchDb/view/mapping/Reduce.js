function (keys, values, rereduce) {
    if (rereduce) {

        var assigned = {};
        for (var i = 0; i < values.length; ++i) {
            for (var x in values[i].assigned) {
                // TODO assert
                assigned[x] = JSON.parse(JSON.stringify(values[i].assigned[x]));
            }
        }

        var unassigned = {};
        for (var i = 0; i < values.length; ++i) {
            for (var unassignedSupperMark in values[i].unassigned) {
                var found = false;
                var hiveMarkKeys = Object.keys(assigned);
                var supperData = {
                    'weight': values[i].unassigned[unassignedSupperMark].weight,
                    "wirrbau": values[i].unassigned[unassignedSupperMark].wirrbau
                };
                for (var hiveMarkC in hiveMarkKeys) {
                    if (unassignedSupperMark in assigned[hiveMarkKeys[hiveMarkC]]) {
                        assigned[hiveMarkKeys[hiveMarkC]][unassignedSupperMark] = supperData;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    // TODO assert
                    unassigned[unassignedSupperMark] = supperData;
                }
            }
        }

        return { assigned: assigned, unassigned: unassigned };
    }
    else {
        var assigned = {};
        // build assigned structure
        for (var i = 0; i < values.length; ++i) {
            if (values[i].typ === 'ernte') {
                // TODO assert
                assigned[values[i].hiveMark] = {};
                for (var j = 0; j < values[i].supperMarks.length; ++j) {
                    assigned[values[i].hiveMark][values[i].supperMarks[j]] = {};
                }

            }
        }

        var unassigned = {};
        for (var i = 0; i < values.length; ++i) {
            if (values[i].typ === 'wiegung') {
                var found = false;
                var supperData = {
                    'weight': values[i].weight,
                    "wirrbau": values[i].wirrbau
                };
                for (var j = 0; j < assigned.length; ++j) {
                    if (values[i].hiveMark in assigned[j]) {
                        assigned[j][i] = supperData;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    // TODO assert
                    unassigned[values[i].hiveMark] = supperData;
                }
            }
        }
        return { assigned: assigned, unassigned: unassigned };
    }

}