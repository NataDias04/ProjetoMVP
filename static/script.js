document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studyForm');
    const topicsContainer = document.getElementById('topicsContainer');
    const addTopicButton = document.getElementById('addTopic');
    const topicTemplate = document.getElementById('topicTemplate');

    // Adicionar o primeiro tópico ao carregar a página
    addTopic();

    // Event listeners
    addTopicButton.addEventListener('click', addTopic);
    form.addEventListener('submit', handleSubmit);

    function addTopic() {
        const topicElement = document.importNode(topicTemplate.content, true);
        const removeButton = topicElement.querySelector('.btn-remove');
        
        removeButton.addEventListener('click', function() {
            if (topicsContainer.children.length > 1) {
                this.closest('.topic-card').remove();
            }
        });

        topicsContainer.appendChild(topicElement);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        const timeAvailable = document.getElementById('timeAvailable').value;
        const timeUnit = document.getElementById('timeUnit').value;
        const topics = topicsContainer.querySelectorAll('.topic-card');

        // Converter tempo para minutos, se necessário
        const timeAvailableInMinutes = timeUnit === 'hours' ? timeAvailable * 60 : timeAvailable;

        formData.append('time_available', timeAvailableInMinutes);
        formData.append('num_topics', topics.length);

        topics.forEach((topic, index) => {
            const name = topic.querySelector('.topic-name').value;
            const priority = topic.querySelector('.priority').value;
            const difficulty = topic.querySelector('.difficulty').value;

            formData.append(`topic_${index + 1}`, name);
            formData.append(`priority_${index + 1}`, priority);
            formData.append(`difficulty_${index + 1}`, difficulty);
        });
        

        try {
            const response = await fetch('/generate-plan', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.text();
                document.open();
                document.write(result);
                document.close();
            } else {
                alert('Erro ao gerar o plano de estudos. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Erro ao gerar o plano de estudos. Por favor, tente novamente.');
        }
    }
});
