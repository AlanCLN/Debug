
export const updateSetting = setting => (
    $.ajax({
        method: 'put',
        url: `/api/settings/${setting.id}`,
        data: {setting}
    })
)

export const fetchSettings = () => (
    $.ajax({
        method: 'get',
        url: '/api/settings',
    })
)