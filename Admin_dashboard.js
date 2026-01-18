// Chart data
        let AD_chartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            datasets: [
                { data: [20, 45, 35, 50, 30, 55, 70, 85], color: '#3b82f6' },
                { data: [30, 40, 50, 45, 60, 75, 65, 90], color: '#60a5fa' },
                { data: [25, 50, 45, 60, 55, 65, 80, 95], color: '#93c5fd' }
            ]
        };

        // Draw Chart
        function AD_drawChart() {
            const canvas = document.getElementById('AD_progressChart');
            const ctx = canvas.getContext('2d');
            const width = canvas.width = canvas.offsetWidth;
            const height = canvas.height = 300;

            ctx.clearRect(0, 0, width, height);

            // Draw grid
            ctx.strokeStyle = '#e5e7eb';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 5; i++) {
                const y = (height / 5) * i;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Draw lines
            const pointSpacing = width / (AD_chartData.labels.length - 1);
            
            AD_chartData.datasets.forEach((dataset) => {
                ctx.strokeStyle = dataset.color;
                ctx.lineWidth = 3;
                ctx.beginPath();

                dataset.data.forEach((value, index) => {
                    const x = index * pointSpacing;
                    const y = height - (value / 100) * height;
                    
                    if (index === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                });

                ctx.stroke();

                // Fill area under line
                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.closePath();
                ctx.fillStyle = dataset.color + '20';
                ctx.fill();
            });
        }

        // Button functions
        function AD_addData() {
            const newValue = Math.floor(Math.random() * 40) + 60;
            AD_chartData.datasets.forEach(dataset => {
                dataset.data.push(newValue + Math.floor(Math.random() * 20) - 10);
            });
            AD_chartData.labels.push('M' + AD_chartData.labels.length);
            AD_drawChart();
            alert('New data point added!');
        }

        function AD_editData() {
            AD_chartData.datasets.forEach(dataset => {
                const lastIndex = dataset.data.length - 1;
                dataset.data[lastIndex] = Math.floor(Math.random() * 40) + 60;
            });
            AD_drawChart();
            alert('Last data point edited!');
        }

        function AD_deleteData() {
            if (AD_chartData.labels.length > 2) {
                AD_chartData.datasets.forEach(dataset => {
                    dataset.data.pop();
                });
                AD_chartData.labels.pop();
                AD_drawChart();
                alert('Last data point deleted!');
            } else {
                alert('Need at least 2 data points!');
            }
        }

        // Initialize
        window.addEventListener('load', AD_drawChart);
        window.addEventListener('resize', AD_drawChart);
 