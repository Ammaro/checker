
#include <Boost/python.hpp>
#include <vector>
#include <cmath>
#include <boost/python/stl_iterator.hpp>
#include <iostream>

namespace py = boost::python;
using namespace std;

template< typename T >
inline std::vector< T > to_std_vector( const py::object& iterable )
{
    return std::vector< T >( py::stl_input_iterator< T >( iterable ),
                             py::stl_input_iterator< T >( ) );
}

int closest_rank(int player_rank, const py::object& iterable)
{
    vector<int> ns = to_std_vector<int>(iterable);
    for(int i=0; i <ns.size(); i++)
    {
        cout << ns[i] << endl;
    }
    return player_rank;
}

//int closest_rank(int player_rank, vector<int> other_ranks)
//{
//    int index=-1;
//    int distance=342342;
//    for(int i =0;i<other_ranks.size();i++) {
//        if(abs(other_ranks[i]-player_rank) < distance) {
//            distance = abs(other_ranks[i]-player_rank);
//            index= i;
//        }
//    }
//    return index;
//}

BOOST_PYTHON_MODULE( game ) {
    py::def( "closest_rank", closest_rank);
}


