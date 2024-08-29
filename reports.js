export default () => ({
    reportComponent: {
        report: JSON.parse(localStorage.getItem('report')) || [],
        notify: {
            show: false,
            message: ''
        },
        addProject: function(title) {
            this.report.push({title: title, tasks: []});
            this.storeReport();
        },
        editProject: function (index, title) {
            this.report[index] = {title: title, tasks: this.report[index].tasks};
            this.storeReport();
        },
        deleteProject: function (index) {
            this.report.splice(index, 1);
            this.storeReport();
        },
        addTask: function (projectIndex, title, hours) {
            this.report[projectIndex].tasks.push({title: title, hours: parseFloat(hours)});
            this.storeReport();
        },
        editTask: function(projectIndex, taskIndex, title, hours) {
            this.report[projectIndex].tasks[taskIndex] = {title: title, hours: parseFloat(hours)};
            this.storeReport();
        },
        deleteTask: function(projectIndex, taskIndex) {
            this.report[projectIndex].tasks.splice(taskIndex, 1);
        },
        storeReport: function () {
            localStorage.setItem('report', JSON.stringify(this.report));
        },
        stringifyReport: function () {
            let totalHours = 0;
            return 'Привіт, сьогодні працював над:' + '\n' + this.report.reduce((acc, project, index) => {
                const projectIndex = index + 1;
                return acc + projectIndex + ') ' + project.title + '\n' + project.tasks.reduce((acc, task, index) => {
                    const taskIndex = index + 1;
                    totalHours += parseFloat(task.hours);
                    return acc + '  ' + projectIndex + '.' + taskIndex + ') ' + task.title + ' - ' + task.hours + this.getHoursEnding(task.hours) + '\n';
                }, '')
            }, '') + 'Сумарно пропрацював ' + totalHours + this.getHoursEnding(totalHours);
        },
        copyToClipboard: function () {
            return navigator.clipboard.writeText(this.stringifyReport())
                .then(this.showNotify({show: true, message: 'Скопійовано в буфер обміну'}))
                .catch();
        },
        showNotify: function (notification) {
            this.notify = notification;
            setTimeout(() => {
                this.notify = {show: false, message: ''};
            }, 1500);
        },
        getHoursEnding: function (hours) {
            if (hours === 1) {
                return ' годину';
            } else if (hours >= 2 && hours <= 4) {
                return ' години';
            } else {
                return ' годин';
            }
        }
    },
})