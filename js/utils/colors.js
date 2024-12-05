export function getMethodColorClass(method) {
    const colors = {
        get: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
        post: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        put: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
        delete: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
        patch: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
        options: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
    };
    return colors[method.toLowerCase()] || colors.options;
}

export function getStatusColorClass(code) {
    if (code.startsWith('2')) return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    if (code.startsWith('4')) return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    if (code.startsWith('5')) return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
    return 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300';
}