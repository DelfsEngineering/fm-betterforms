# Practices for File Downloads

1. **Use Base64 Encoding for Sensitive Files**:
   * For applications handling sensitive information (e.g., medical records), avoid exposing files on the public internet. Instead, store files as Base64 strings in a database field.
   *   When a user requests a download, use a utility hook to retrieve the Base64 string and create a downloadable link dynamically. Here’s a sample implementation:

       ```javascript
       let data64 = 'd64';
       let a = document.createElement("a");
       a.href = "data:application/octet-stream;base64," + data64;
       a.download = "Results.pdf";
       a.click();
       Substitute($function; "d64"; Users::base64ofPDF);
       ```
2. **Utilize the Execute Data API Script Step**:
   * With FileMaker Server version 19 and above, you can use the Execute Data API script step to generate a temporary URL for file downloads. This URL is valid for 15 minutes and can be used to securely download files without exposing them publicly.
3. **Consider User Experience**:
   * If users are not tech-savvy, consider implementing features that automatically open the downloaded file in a new tab or window. This can help reduce confusion and support calls.
4. **Performance Considerations**:
   * When generating files, be mindful of the execution time. For example, generating a one-page PDF may take around 200ms, while a 20-page PDF could take 300-400ms. Optimize file sizes and content to improve performance.
5. **Security Measures**:
   * Ensure that any file download mechanism adheres to security best practices, especially when dealing with sensitive data. This includes validating user permissions and ensuring that files are not accessible without proper authentication.

\
