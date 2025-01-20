
// change the string to lower case and add "-" between each word instead of space
// My Profile -> my-profile
export function formatString(input: string): string {
    return input.toLowerCase().replace(/\s+/g, "-");
}

// get the last part of the url
export function getLastPartOfURL(): string {
    const url = window.location.pathname; // Get the path (e.g., /my/profile/page)
    const parts = url.split("/"); // Split the path by "/"
    return parts[parts.length - 1] || ""; // Return the last part
}


export const getGreeting = (): string => {
    const currentHour = new Date().getHours(); // Get the current hour (0-23)

    if (currentHour < 12) {
        return 'Good Morning';
    } else if (currentHour < 18) {
        return 'Good Afternoon';
    } else {
        return 'Good Evening';
    }
};

// capitalize first letter
export function capitalizeFirstLetter(str: string): string {
    if (str.length === 0) return str; // Return the string as is if it's empty
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//   truncate string
export function truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
        return str.slice(0, maxLength-3) + "...";
    }
    return str;
}

// remove ""
export function removeQuotes(str: string): string {
    return str.replace(/"/g, '');
  }