document.addEventListener('DOMContentLoaded', () => {
    // --- ⚠️  CONFIGURATION ⚠️ ---
    const CLOUDINARY_CONFIG = {
        cloudName: 'dujlwpbrv',        // ✅ NO CHANGE NEEDED HERE
        uploadPreset: 'coffee555',   // ✅ NO CHANGE NEEDED HERE
        // The upload URL for direct API calls
        apiUrl: 'https://api.cloudinary.com/v1_1/dujlwpbrv/image/upload'
    };

    // DOM Elements
    const uploadStatusDiv = document.getElementById('upload-status');
    const uploadForms = document.querySelectorAll('.upload-form');

    // This function uploads a single file to Cloudinary
    const uploadFile = async (file, categoryTag) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
        formData.append('tags', categoryTag); // Add the specific tag

        try {
            const response = await fetch(CLOUDINARY_CONFIG.apiUrl, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Upload failed: ${errorData.error.message}`);
            }

            const data = await response.json();
            return { success: true, fileName: file.name, tag: categoryTag };

        } catch (error) {
            console.error('Upload error:', error);
            return { success: false, fileName: file.name, error: error.message };
        }
    };

    // Attach an event listener to every upload form
    uploadForms.forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the form from actually submitting

            const categoryTag = form.dataset.categoryTag;
            const fileInput = form.querySelector('.file-input');
            const files = fileInput.files;

            if (files.length === 0) {
                uploadStatusDiv.innerHTML = `<p class="error">Please select at least one file to upload.</p>`;
                return;
            }

            // Clear previous status and show a loading message
            uploadStatusDiv.innerHTML = `<p>Uploading ${files.length} file(s)...</p>`;
            uploadStatusDiv.className = 'info';

            const uploadPromises = Array.from(files).map(file => uploadFile(file, categoryTag));
            
            const results = await Promise.all(uploadPromises);

            // Display the final results
            let successCount = 0;
            let finalHtml = '<h4>Upload Complete:</h4><ul>';

            results.forEach(result => {
                if (result.success) {
                    successCount++;
                    finalHtml += `<li><strong>${result.fileName}</strong> uploaded successfully with tag: <strong>${result.tag}</strong>.</li>`;
                } else {
                    finalHtml += `<li class="error"><strong>${result.fileName}</strong> failed to upload. (${result.error})</li>`;
                }
            });

            finalHtml += '</ul>';
            uploadStatusDiv.innerHTML = finalHtml;
            uploadStatusDiv.className = successCount === files.length ? 'success' : 'error';

            form.reset(); // Clear the file input after upload
        });
    });
});